export default defineNuxtConfig({
  modules: ['../src/module'],

  compatibilityDate: '2024-12-30',

  /**
   * nuxt-proxy-request Demo Configuration
   *
   * Showcases all major features of the module:
   * 1. Multiple proxy targets (different backends)
   * 2. Path filtering with glob patterns
   * 3. Path rewriting (prefix stripping)
   * 4. configureProxyRequest with custom header injection
   * 5. Both proxy key and runtimeConfig.proxy support
   */
  proxy: {
    options: [
      // ── Rule 1: Users API ──────────────────────────────────────
      // Proxies /api/users/** → https://jsonplaceholder.typicode.com/users/**
      // Demonstrates: basic proxy, pathRewrite, glob pathFilter
      {
        target: 'https://jsonplaceholder.typicode.com',
        pathFilter: ['/api/users/**'],
        pathRewrite: {
          '^/api': '',
        },
      },

      // ── Rule 2: Posts API ──────────────────────────────────────
      // Proxies /api/posts/** → https://jsonplaceholder.typicode.com/posts/**
      // Demonstrates: multiple targets, different API path
      {
        target: 'https://jsonplaceholder.typicode.com',
        pathFilter: ['/api/posts/**'],
        pathRewrite: {
          '^/api': '',
        },
      },

      // ── Rule 3: Echo / Header Inspection ───────────────────────
      // Proxies /api/echo/** → https://httpbin.org/anything
      // Demonstrates: configureProxyRequest with custom headers,
      //               path rewrite to a different path structure
      {
        target: 'https://httpbin.org',
        pathFilter: ['/api/echo/**'],
        pathRewrite: {
          '^/api/echo': '/anything',
        },
        configureProxyRequest: function (event) {
          return {
            headers: {
              'X-Proxy-Auth': 'nuxt-proxy-demo-token',
              'X-Request-Source': 'nuxt-proxy-request-module',
              'X-Proxy-Version': '4.0.2',
              'X-Demo-Feature': 'configureProxyRequest-header-injection',
            },
          }
        },
      },

      // ── Rule 4: Function-based pathFilter ───────────────────────
      // Only proxies GET requests to /api/filter/**
      // Demonstrates: function-based pathFilter (advanced usage)
      // NOTE: POST /api/filter/** will NOT be proxied — the function
      //       only returns true for GET requests
      {
        target: 'https://httpbin.org',
        pathFilter: function (path, req) {
          /* Use new RegExp() instead of RegExp literal inside function */
          const re = new RegExp('^/api/filter/.*')
          return re.test(path) && req.method === 'GET'
        },
        pathRewrite: {
          '^/api/filter': '/anything',
        },
        configureProxyRequest: function (event) {
          return {
            headers: {
              'X-Filter-Type': 'function-based-pathFilter-method-GET-only',
            },
          }
        },
      },
    ],
  },
})
