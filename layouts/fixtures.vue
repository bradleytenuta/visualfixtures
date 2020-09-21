<template>
  <v-app>
    <!-- Fixtures Navbar -->
    <nav-bar />

    <!-- Page Content -->
    <nuxt />
  </v-app>
</template>
<script>
import Navbar from '~/components/fixtures/navbar.vue'
export default {
  components: {
    'nav-bar': Navbar,
  },
}
</script>
