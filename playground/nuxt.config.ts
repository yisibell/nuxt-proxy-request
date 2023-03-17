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
})
