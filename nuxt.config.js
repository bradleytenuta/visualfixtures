import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - visualfixtures',
    title: 'Visual-Fixtures',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
  ],

  // Firebase Module configuration (https://firebase.nuxtjs.org/)
  // TODO: Replace with visual-fixtures webapp once happy.
  firebase: {
    config: {
      apiKey: 'AIzaSyCo9oVpYp0IN-Jw3VwU0KHODouIbCaSC6o',
      authDomain: 'visualfixturestest.firebaseapp.com',
      databaseURL: 'https://visualfixturestest.firebaseio.com',
      projectId: 'visualfixturestest',
      storageBucket: 'visualfixturestest.appspot.com',
      messagingSenderId: '323461236085',
      appId: '1:323461236085:web:8c9a3d9582459f1f617f3c',
      measurementId: 'G-70ZJVPNL2L',
    },
    services: {
      analytics: true,
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.green.darken2,
          secondary: colors.blueGrey.darken4,
          accent: colors.grey.darken3,
        },
        dark: {
          primary: colors.green.darken2,
          secondary: colors.blueGrey.darken4,
          accent: colors.grey.darken3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
