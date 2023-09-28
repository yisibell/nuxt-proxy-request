

<p align="center">
  <a href="https://www.npmjs.org/package/nuxt-proxy-request">
    <img src="https://img.shields.io/npm/v/nuxt-proxy-request.svg">
  </a>
  <a href="https://npmcharts.com/compare/nuxt-proxy-request?minimal=true">
    <img src="https://img.shields.io/npm/dm/nuxt-proxy-request.svg">
  </a>
  <br>
</p>

# nuxt-proxy-request

A http proxy module for nuxt(3) powered by <a href="https://github.com/yisibell/h3-proxy"> h3-proxy </a>.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

## Why use this module?

- See this issue [Error when starting a Project using "http-proxy-middleware" with "npm run start" #15608](https://github.com/nuxt/nuxt/issues/15608).

## Features

- Support for both **development** and **production** environments.
- Almost the same API as  [nuxt-proxy](https://github.com/wobsoriano/nuxt-proxy) that using [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware), But this module using <a href="https://github.com/yisibell/h3-proxy"> h3-proxy </a>.
- Support **Typescript**.

## Quick Setup

1. Add `nuxt-proxy-request` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-proxy-request

# Using yarn
yarn add --dev nuxt-proxy-request

# Using npm
npm install --save-dev nuxt-proxy-request
```

2. Add `nuxt-proxy-request` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-proxy-request'
  ],
  proxy: {
    options: [
      {
        target: 'http://www.example.com',
        pathFilter: ['/api/**'],
        pathRewrite: {
          '^/api': ''
        }
      }
    ]
  }
  // OR
  // runtimeConfig: {
  //   proxy: {...}
  // }
})
```

That's it! You can now use **nuxt-proxy-request** in your Nuxt app ✨

## Options

| Key | Type | Default value | Description |
| :---: | :---: | :---: | :---: |
| `options` | `object/Array<object>` | `[]` | Configure which targets you want to proxy. :warning: TIPS: More **config object** please see [h3-proxy's Options](https://github.com/yisibell/h3-proxy#options), You can pass an **array of options** for multiple targets or pass an **object of options** for single target.|


### :warning: Do not when the value of a certain configuration item is a function type :warning:

1. Do not use `runtimeConfig.proxy` for configuration, as the function type value in the `runtimeConfig` object will be ignored. Please use `proxy` for configuration as it has undergone special processing on the internal implementation.

2. Do not use any external variables within the function body.

```ts
import foo from 'foo'

export default defineNuxtConfig({
  modules: [
    'nuxt-proxy-request'
  ],
  proxy: {
    options: [
      {
        target: 'http://www.example.com',
        pathFilter: function(path, req) {
          console.log(foo) /* At runtime, foo is undefined. */

          return path.match(/^\/api/) && req.method === 'GET';
        },
        pathRewrite: {
          '^/api': ''
        }
      }
    ]
  }
})
```

3. Do not use **RegExp** literal, using `new RegExp()` instead, in function body.

4. Do not use **Single-Line Comments**, using **Multiple-Line Comments** instead, in function body.

> If the above points cause you trouble. You can use `h3-proxy` directly. See [how to use h3-proxy in Nuxt3 Project](https://github.com/yisibell/h3-proxy#nuxt).

## Development

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm run dev:prepare

# Develop with the playground
pnpm run dev

# Build the playground
pnpm run dev:build

# Run ESLint
pnpm run lint

# Run Vitest
pnpm run test
pnpm run test:watch

# Release new version
pnpm run release
```
