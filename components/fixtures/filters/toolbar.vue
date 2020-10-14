<template>
  <div class="filter-top-bar">
    <!-- Select All Checkbox -->
    <v-checkbox v-model="displayAll" label="Display All" class="filter-top-bar-checkbox"></v-checkbox>

    <!-- Spacer -->
    <v-spacer></v-spacer>

    <!-- Filter Button Mobile -->
    <v-btn class="filter-top-bar-filter-button-mobile mx-2" color="gray" small icon @click="dropdownState = !dropdownState">
      <v-icon v-if="dropdownState">mdi-filter-menu-outline</v-icon>
      <v-icon v-else>mdi-filter-menu</v-icon>
    </v-btn>

    <!-- Filter Button Desktop -->
    <v-btn class="filter-top-bar-filter-button-desktop mx-2" small text @click="dropdownState = !dropdownState">
      <span>Filter</span>
      <v-icon right v-if="dropdownState">mdi-filter-menu-outline</v-icon>
      <v-icon right v-else>mdi-filter-menu</v-icon>
    </v-btn>

    <!-- Open/Close list button -->
    <template v-if="!isSnippetStore">
      <v-divider class="vertical-divider" vertical></v-divider>
      <v-btn class="filter-top-bar-list-toggle-button ml-2" small text @click="toggleListMenu()">
        <span>Map</span>
        <v-icon class="map-toggle-icon">mdi-map</v-icon>
        <v-icon v-if="listDropdownState">mdi-menu-down mdi-rotate-180</v-icon>
        <v-icon v-else>mdi-menu-down</v-icon>
      </v-btn>
    </template>
  </div>
</template>

<script>
export default {
  name: 'toolbar',
  /**
   * Toolbar.vue updates both displayAll and dropdownState on Vuex.
   */
  computed: {
    displayAll: {
      get() {
        return this.$store.state.displayAll
      },
      set(newValue) {
        this.$store.dispatch('changeDisplayAll', newValue)
      },
    },
    dropdownState: {
      get() {
        return this.$store.state.dropdownState
      },
      set(newValue) {
        this.$store.dispatch('changeDropdownState', newValue)
      },
    },
    isSnippetStore: {
      get() {
        return this.$store.state.isSnippet
      },
      set(newValue) {
        this.$store.dispatch('changeIsSnippet', newValue)
      },
    },
    listDropdownState: {
      get() {
        return this.$store.state.listDropdownState
      },
      set(newValue) {
        this.$store.dispatch('changeListDropdownState', newValue)
      },
    },
  },
  watch: {
    /**
     * Watches for when the listDropdownState value changes. When it does
     * it either opens or closes the list dropdown.
     */
    listDropdownState() {
      // If a snippet then leave function.
      if (this.isSnippetStore) return

      // If the list is closed.
      if (!this.listDropdownState) {
        document.getElementById('calendar-main-container').style.maxHeight = '53px'
      } else {
        document.getElementById('calendar-main-container').style.maxHeight = '100%'
      }
    },
  },
  methods: {
    /**
     * This function toggles the list open and closed.
     * It only works when not in a snippet view. This also animates the
     * opening and closing of the list menu.
     */
    toggleListMenu() {
      // If a snippet then leave function.
      if (this.isSnippetStore) return

      this.listDropdownState = !this.listDropdownState
    },
    /**
     * This function is called whenever the screen size changes.
     * When the screen size becomes desktop, it deletes the manually set styles.
     */
    myEventHandler(e) {
      if (e.target.innerWidth > 960) {
        document.getElementById('calendar-main-container').removeAttribute('style')
        this.listDropdownState = true
      }
    },
  },
  /**
   * Creates a watch listener on the screen resize.
   */
  created() {
    if (process.browser) {
      window.addEventListener('resize', this.myEventHandler)
    }
  },
  /**
   * when this is destroyed, it also destroies the screen size listener.
   */
  destroyed() {
    if (process.browser) {
      window.removeEventListener('resize', this.myEventHandler)
    }
  },
}
</script>

<style lang="scss" scoped>
.filter-top-bar {
  padding: 12px;
  display: flex;

  .v-input__slot {
    margin: 0px;
  }

  .v-messages {
    display: none;
  }

  .filter-top-bar-filter-button-desktop {
    display: none;
    color: rgba(0, 0, 0, 0.54) !important; /* Same colour as icon buttons */
  }

  .vertical-divider {
    display: inline;
  }
}

@media only screen and (min-width: 960px) {
  .filter-top-bar-list-toggle-button {
    display: none;
  }
  .vertical-divider {
    display: none;
  }
  .filter-top-bar-filter-button-desktop {
    margin: 0px !important;
    display: flex;
  }
  .filter-top-bar-filter-button-mobile {
    display: none;
  }
}

.filter-top-bar-checkbox {
  width: fit-content;
  margin: 0;
  display: inline-flex;
  padding-top: 0px;
  height: 24px;
}

.filter-top-bar-list-toggle-button i {
  color: rgba(0, 0, 0, 0.54) !important;
}

.map-toggle-icon {
  margin-right: -10px;
}
</style>
