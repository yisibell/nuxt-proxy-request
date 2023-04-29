import { fileURLToPath } from 'node:url'
import { defu } from 'defu'
import { addServerHandler, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { CreateProxyEventHandlerOptions } from 'h3-proxy'
import { hash, objectHash } from 'ohash'

export type ProxyOptions = CreateProxyEventHandlerOptions[] | CreateProxyEventHandlerOptions

export interface ModuleOptions {
  options: ProxyOptions
}

declare module 'nuxt/schema' {
  interface RuntimeConfig {
    proxy: ModuleOptions
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-proxy-request',
    configKey: 'proxy',
    version: '^3.1.0',
  },
  defaults: {
    options: [],
  },
  setup(inlineOptions, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    nuxt.options.build.transpile.push(runtimeDir, /#http-proxy-request/)

    const finalConfig = defu(nuxt.options.runtimeConfig.proxy, inlineOptions)
    
    nuxt.options.runtimeConfig.proxy = finalConfig

    function createProxyMiddleware(options: CreateProxyEventHandlerOptions, index?: number) {
      return `
        import { createProxyMiddleware } from ${JSON.stringify(resolve(runtimeDir, './middleware.mjs'))}
        import { defu } from 'defu'
        import { useRuntimeConfig } from '#imports'
    
        const buildtimeOptions = ${JSON.stringify(options)}
        const runtimeOptions = [].concat(useRuntimeConfig().proxy?.options)[${JSON.stringify(index)} ?? 0]
    
        export default createProxyMiddleware(defu(runtimeOptions, buildtimeOptions))
      `
    }

    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.virtual = nitroConfig.virtual || {}

      if (Array.isArray(finalConfig.options)) {
        (finalConfig.options as CreateProxyEventHandlerOptions[]).forEach((options, index) => {
          const handler = `#http-proxy-request/${hash(objectHash(options))}.mjs`
          nitroConfig.virtual![handler] = createProxyMiddleware(options, index)

          addServerHandler({
            handler,
            middleware: true,
          })
        })
        
      } else {

        const handler = `#http-proxy-request/${hash(objectHash(finalConfig.options))}.mjs`

        nitroConfig.virtual[handler] = createProxyMiddleware(finalConfig.options)

        addServerHandler({
          handler,
          middleware: true,
        })
      }
    })
  },
})
