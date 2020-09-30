<template>
  <v-container>
    <div class="filter-top-bar">
      <!-- Select All Checkbox -->
      <v-checkbox v-model="selectAllMonth" label="Display All" class="filter-top-bar-checkbox"></v-checkbox>

      <!-- Spacer -->
      <v-spacer></v-spacer>

      <!-- Filter Button Mobile -->
      <v-btn class="filter-top-bar-filter-button-mobile" color="gray" small icon @click="dropdownState = !dropdownState">
        <v-icon v-if="!dropdownState">mdi-filter-menu</v-icon>
        <v-icon v-else>mdi-filter-menu-outline</v-icon>
      </v-btn>

      <!-- Filter Button Desktop -->
      <v-btn class="filter-top-bar-filter-button-desktop" small text @click="dropdownState = !dropdownState">
        <span>Filter</span>
        <v-icon right v-if="!dropdownState">mdi-filter-menu</v-icon>
        <v-icon right v-else>mdi-filter-menu-outline</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'toolbar',
  props: {
    selectAllMonth: {
      type: Boolean,
      required: true,
    },
    dropdownState: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped>
.filter-top-bar {
  display: flex;
}

.filter-top-bar .v-input__slot {
  margin: 0px;
}

.filter-top-bar .v-messages {
  display: none;
}

.filter-top-bar-filter-button-desktop {
  display: none;
  color: rgba(0, 0, 0, 0.54) !important; /* Same colour as icon buttons */
}

@media only screen and (min-width: 960px) {
  .filter-top-bar-filter-button-desktop {
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
}
</style>
