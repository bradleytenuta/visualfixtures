<template>
  <v-app id="app">
    <!-- Page Content -->
    <nuxt />
  </v-app>
</template>
<script>
export default {
  name: 'home',
  head() {
    return {
      titleTemplate: 'Visual-Fixtures',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Whether you compete with a club or flying solo, Visual Fixtures makes it easy to find competitions wherever you are and anytime of year.',
        },
      ],
    }
  },
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
