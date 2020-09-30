<template>
  <v-app id="app">
    <!-- Fixtures Navbar -->
    <nav-bar />

    <!-- Page Content -->
    <nuxt />
  </v-app>
</template>
<script>
import navbar from '~/components/fixtures/navbar.vue'

export default {
  name: 'fixtures',
  components: {
    'nav-bar': navbar,
  },
}
</script>

<style>
html {
  height: 100%;
  overflow: hidden;
}

body {
  height: 100%;
}

#app {
  font-family: roboto;
  height: 100%;
}
</style>
