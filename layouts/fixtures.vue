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
/**
 * Below is styling that is used globally for fixture pages.
 */
html {
  height: 100%;
  overflow: hidden;
}

body {
  height: 100%;
}

#__nuxt {
  height: 100%;
}

#__layout {
  height: 100%;
}

#app {
  font-family: roboto;
  height: 100%;
}

.compcard .v-btn:not(.v-btn--round).v-size--default {
  padding: 0 8px;
}

.compcard .v-btn__content {
  width: 100%;
}
</style>
