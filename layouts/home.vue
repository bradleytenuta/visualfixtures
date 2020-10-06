<template>
  <v-app id="app">
    <!-- Page Content -->
    <nuxt />
  </v-app>
</template>
<script>
export default {
  name: 'home',
  // TODO: Revert mounted styling back to CSS once Nuxt 3 is released.
  mounted() {
    document.getElementById('__nuxt').removeAttribute('style')
    document.getElementById('__layout').removeAttribute('style')
    document.getElementById('app').removeAttribute('style')
    document.body.removeAttribute('style')
    document.documentElement.removeAttribute('style')
  },
}
</script>
