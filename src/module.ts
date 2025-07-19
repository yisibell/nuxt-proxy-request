import { fileURLToPath } from 'node:url'
import { defu } from 'defu'
import { addServerHandler, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { CreateProxyEventHandlerOptions } from 'h3-proxy'

export type ProxyOptions =
  | CreateProxyEventHandlerOptions[]
  | CreateProxyEventHandlerOptions

export interface ModuleOptions {
  options: ProxyOptions
}

declare module 'nuxt/schema' {
  interface RuntimeConfig {
    proxy: ModuleOptions
  }
}

const virtualModulePrefix = '#nuxt-proxy-request'

const stringifyOptions = (value: any) => {
  const res = JSON.stringify(value, (key, value) => {
    if (typeof value === 'function') {
      return `<Function>${value}</Function>`
    }

    return value
  })

  const saftyRes = res
    .replace(/"<Function>/g, '')
    .replace(/<\/Function>"/g, '')
    .replace(/\\n/g, '')

  return saftyRes
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-proxy-request',
    configKey: 'proxy',
    compatibility: {
      nuxt: '^3.1.0 || ^4.0.0',
    },
  },
  defaults: {
    options: [],
  },
  setup(inlineOptions, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    nuxt.options.build.transpile.push(
      runtimeDir,
      new RegExp(`${virtualModulePrefix}`),
    )

    const finalConfig = defu(nuxt.options.runtimeConfig.proxy, inlineOptions)

    nuxt.options.runtimeConfig.proxy = finalConfig

    // Create a virtual module
    function createProxyServerHandlerVirtualModule(
      opts: CreateProxyEventHandlerOptions,
      index?: number,
    ) {
      return `
        import { createProxyMiddleware } from ${JSON.stringify(
          resolve(runtimeDir, './middleware.js'),
        )}
        import { defu } from 'defu'
        import { useRuntimeConfig } from '#imports'

        const buildtimeOptions = ${stringifyOptions(opts)}

        const runtimeOptions = [].concat(useRuntimeConfig().proxy?.options)[${JSON.stringify(
          index,
        )} ?? 0]

        export default createProxyMiddleware(defu(runtimeOptions, buildtimeOptions))
      `
    }

    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.virtual = nitroConfig.virtual || {}

      // To array
      const finalConfigOptions = Array.isArray(finalConfig.options)
        ? finalConfig.options
        : [finalConfig.options]

      finalConfigOptions.forEach((opts, index) => {
        const handler = `${virtualModulePrefix}/${index}.mjs`

        nitroConfig.virtual![handler] = createProxyServerHandlerVirtualModule(
          opts,
          index,
        )

        addServerHandler({
          handler,
          middleware: true,
        })
      })
    })
  },
})
