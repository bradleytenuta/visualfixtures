<template>
  <v-app>
      <nav-bar />
      <nuxt />
  </v-app>
</template>
<script>
import Navbar from '~/components/fixtures/navbar.vue'
export default {
    components: {
        'nav-bar' : Navbar
    }
}
</script>
