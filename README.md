

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

## Features

- Almost the same API as  [nuxt-proxy](https://github.com/wobsoriano/nuxt-proxy), But this module using <a href="https://github.com/yisibell/h3-proxy"> h3-proxy </a>.
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
          '/api': ''
        }
      }
    ]
  }
})
```

That's it! You can now use nuxt-proxy-request in your Nuxt app ✨

> :Note: More **proxy.options** please see [h3-proxy's Options](https://github.com/yisibell/h3-proxy#options)

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```
