export default defineNuxtConfig({
  modules: ['../src/module'],
  proxy: {
    options: [
      {
        target: 'http://16.163.143.182',
        pathRewrite: { '^/api2': '' },
        pathFilter: ['/api2/**'],
      },
    ],
  },

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
})
