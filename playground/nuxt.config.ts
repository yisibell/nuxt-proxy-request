export default defineNuxtConfig({
  modules: ['../src/module'],

  // test function value
  proxy: {
    options: [
      {
        target: 'http://16.163.143.182',
        pathRewrite: { '^/api2': '' },
        pathFilter: function (path) {
          const re = new RegExp(`^/api2.*`)
          return re.test(path)
        },
      },
    ],
  },

  // proxy: {
  //   options: [
  //     {
  //       target: 'http://16.163.143.182',
  //       pathRewrite: { '^/api2': '' },
  //       pathFilter: ['/api2/**'],
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
})
