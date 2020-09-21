<template>
  <div>
    <v-app-bar flat>

      <!-- Logo -->
      <nuxt-link to="/">
        <v-img class="mx-2" :src="require('~/assets/logos/android-chrome-maskable-192x192.png')" max-height="40"
          max-width="40" contain></v-img>
      </nuxt-link>

      <!-- Sport Menu -->
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-apps</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Spacer -->
      <v-spacer></v-spacer>

      <!-- Settings Menu -->
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>

        <!-- Menu List -->
        <v-list style="padding: 0px">
          
          <nuxt-link to="/help" style="text-decoration: none;">
            <v-list-item @click="">
              <v-icon>mdi-help-circle-outline</v-icon>
              <v-list-item-title>Help</v-list-item-title>
            </v-list-item>
          </nuxt-link>

          <nuxt-link to="/contribute" style="text-decoration: none;">
            <v-list-item @click="">
              <v-icon>mdi-plus-circle-outline</v-icon>
              <v-list-item-title>Contribute</v-list-item-title>
            </v-list-item>
          </nuxt-link>

          <nuxt-link to="/sources" style="text-decoration: none;">
            <v-list-item @click="">
              <v-icon>mdi-earth</v-icon>
              <v-list-item-title>View Sources</v-list-item-title>
            </v-list-item>
          </nuxt-link>

          <!-- Buy Me a Coffee Link -->
          <a href="https://www.buymeacoffee.com/bradleytenuta" target="_blank" style="display: block; height: 62px; background-color: #ff804d;">
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee"
              style="height: 60px !important;width: 217px !important;">
          </a>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>



</template>

<script>
  export default {
    name: 'nav-bar'
  }

</script>
