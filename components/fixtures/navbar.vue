<template>
  <v-app-bar flat class="fixture-navbar">
    <!-- Logo -->
    <!-- img src needs the require tag as vuetify img vue container does not support nuxt asset images -->
    <nuxt-link to="/">
      <v-img
        id="navbar-logo"
        src="https://firebasestorage.googleapis.com/v0/b/visualfixtures.appspot.com/o/logos%2Fandroid-chrome-maskable-192x192.png?alt=media&token=998ee953-f4ec-4613-b95f-9f5aa023ced8"
        max-height="40"
        max-width="40"
        contain
      ></v-img>
    </nuxt-link>

    <!-- Sport Menu -->
    <v-menu left bottom offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" title="Sports Menu" class="mx-2">
          <v-icon>mdi-apps</v-icon>
        </v-btn>
      </template>

      <!-- Sport Menu Button List -->
      <v-list>
        <!-- NOTE: Only place three v-btn per v-list-item -->
        <v-list-item>
          <v-btn
            nuxt
            icon
            to="/athletics"
            class="sport-menu-button"
            title="Athletics"
            :class="{ 'sport-menu-button-active': isActive('Athletics') }"
          >
            <v-icon>mdi-run</v-icon>
          </v-btn>
          <v-btn nuxt icon class="sport-menu-button" title="Coming Soon" disabled>
            <v-icon>mdi-help</v-icon>
          </v-btn>
          <v-btn nuxt icon class="sport-menu-button" title="Coming Soon" disabled>
            <v-icon>mdi-help</v-icon>
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
        <!-- Help Modal -->
        <modal-help>
          <v-list-item>
            <v-icon class="pr-2">mdi-help-circle-outline</v-icon>
            <v-list-item-title>Help</v-list-item-title>
          </v-list-item>
        </modal-help>

        <!-- Contribute Modal -->
        <modal-contribute>
          <v-list-item>
            <v-icon class="pr-2">mdi-plus-circle-outline</v-icon>
            <v-list-item-title>Contribute</v-list-item-title>
          </v-list-item>
        </modal-contribute>

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
</template>

<script>
import modalHelp from '~/components/modals/modal-help'
import modalContribute from '~/components/modals/modal-contribute'

export default {
  name: 'nav-bar',
  components: {
    'modal-help': modalHelp,
    'modal-contribute': modalContribute,
  },
  methods: {
    isActive(pageName) {
      return this.$route.path.toLowerCase().includes(pageName.toLowerCase())
    },
  },
}
</script>

<style scoped>
.fixture-navbar {
  height: 56px !important;
  display: flex;
  flex-direction: column;
}

.sport-menu-button {
  background-color: lightgray;
  border-radius: 0;
  margin: 2px;
  height: 50px;
  width: 50px;
}

.sport-menu-button i {
  height: 30px;
  font-size: 30px;
  width: 30px;
}

.sport-menu-button-active {
  border-bottom: 4px green solid;
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
