<template>
  <v-app id="app">
    <!-- Page Content -->
    <nuxt />
  </v-app>
</template>
<script>
export default {
  name: 'snippets',
  // TODO: Revert mounted styling back to CSS once Nuxt 3 is released.
  mounted() {
    document.getElementById('__nuxt').style.height = '100%'
    document.getElementById('__layout').style.height = '100%'
    document.getElementById('app').style.height = '100%'
    document.body.style.height = '100%'
    document.documentElement.style.height = '100%'
    document.documentElement.style.overflow = 'hidden'
  },
}
</script>

<style>
/**
 * Below is styling that is used globally for fixture pages.
 */
#app {
  font-family: roboto;
}

.compcard .v-btn:not(.v-btn--round).v-size--default {
  padding: 0 8px;
}

.compcard .v-btn__content {
  width: 100%;
}
</style>
