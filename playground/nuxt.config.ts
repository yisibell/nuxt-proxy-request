export default defineNuxtConfig({
  modules: ['../src/module'],

  compatibilityDate: '2024-12-30',

  // test function value
  // proxy: {
  //   options: [
  //     {
  //       target: 'http://16.163.143.182',
  //       pathRewrite: { '^/api2': '' },
  //       pathFilter: function (path) {
  //         const re = new RegExp(`^/api2.*`)
  //         return re.test(path)
  //       },
  //       configureProxyRequest: function (event) {
  //         console.log(event.node.req.headers)
  //         return {
  //           headers: {
  //             token: 'set some token value',
  //           },
  //         }
  //       },
  //     },
  //   ],
  // },

  // or use runtimeConfig
  // runtimeConfig: {
  //   proxy: {
  //     options: [
  //       {
  //         target: 'http://16.163.143.182',
  //         pathRewrite: { '^/api2': '' },
  //         pathFilter: ['/api2/**'],
  //       },
  //     ],
  //   },
  // },
  // runtimeConfig: {
  //   proxy: {
  //     options: [
  //       {
  //         target: 'http://16.163.143.182',
  //         pathRewrite: { '^/api2': '' },
  //         pathFilter: function (path) {
  //           const re = new RegExp(`^/api2.*`)
  //           return re.test(path)
  //         },
  //       },
  //     ],
  //   },
  // },
  proxy: {
    options: [
      {
        target: 'http://18.163.184.231',
        pathRewrite: { '^/api2': '' },
        pathFilter: ['/api2/**'],
      },
    ],
  },
})
