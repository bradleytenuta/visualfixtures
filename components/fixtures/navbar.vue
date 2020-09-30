<template>
  <div>
    <v-app-bar flat>
      <!-- Logo -->
      <!-- img src needs the require tag as vuetify img vue container does not support nuxt asset images -->
      <nuxt-link to="/">
        <v-img
          class="mx-2"
          :src="require('~/assets/logos/android-chrome-maskable-192x192.png')"
          max-height="40"
          max-width="40"
          contain
        ></v-img>
      </nuxt-link>

      <!-- Sport Menu -->
      <v-menu left bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" title="Sport Menu">
            <v-icon>mdi-apps</v-icon>
          </v-btn>
        </template>

        <!-- Sport Menu Button List -->
        <v-list>
          <!-- NOTE: Only place three v-btn per v-list-item -->
          <v-list-item>
            <v-btn nuxt icon to="/athletics" class="sport-menu-button" title="Athletics">
              <v-icon>mdi-run</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Spacer -->
      <v-spacer></v-spacer>

      <!-- Settings Menu -->
      <v-menu left bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" title="Settings Menu">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <!-- Menu List -->
        <v-list class="menu-list">
          <v-list-item @click="">
            <v-icon class="pr-2">mdi-help-circle-outline</v-icon>
            <v-list-item-title>Help</v-list-item-title>
          </v-list-item>

          <v-list-item @click="">
            <v-icon class="pr-2">mdi-plus-circle-outline</v-icon>
            <v-list-item-title>Contribute</v-list-item-title>
          </v-list-item>

          <v-list-item @click="">
            <v-icon class="pr-2">mdi-earth</v-icon>
            <v-list-item-title>View Sources</v-list-item-title>
          </v-list-item>

          <!-- Buy Me a Coffee Link -->
          <a
            href="https://www.buymeacoffee.com/bradleytenuta"
            target="_blank"
            class="menu-buymecoffee"
            style="display: block; height: 62px; background-color: #ff804d"
          >
            <img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" />
          </a>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
}
</script>

<style scoped>
.sport-menu-button {
  background-color: lightgray;
  border-radius: 0;
  margin: 2px;
}
.sport-menu-button-active {
  border-bottom: 1px green solid;
}

.menu-list {
  padding: 0px;
}
.menu-buymecoffee {
  display: block;
  height: 62px;
  background-color: #ff804d;
}
.menu-buymecoffee > img {
  height: 60px !important;
  width: 217px !important;
}
</style>
