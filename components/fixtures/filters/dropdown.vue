<template>
  <v-container class="filter-dropdown-container" :class="{ 'filter-dropdown-container-open': dropdownState }">
    <!-- Filters the search results -->
    <v-row align="center">
      <!-- Search Bar -->
      <v-col class="d-flex select-container" cols="12" md="3" lg="5">
        <v-text-field
          hide-details
          clearable
          outlined
          single-line
          label="Find..."
          prepend-inner-icon="mdi-magnify"
          v-model="searchText"
        ></v-text-field>
      </v-col>

      <!-- Month Select -->
      <v-col class="d-flex select-container" cols="12" md="3" lg="3">
        <v-select :items="months" label="Month" v-model="selectedMonth" outlined :disabled="displayAll"></v-select>
      </v-col>

      <!-- Sort By Select -->
      <v-col class="d-flex select-container" cols="7" md="3" lg="2">
        <v-select :items="sortOptions" label="Sort By" v-model="selectedSort" outlined></v-select>
      </v-col>

      <!-- Country Select -->
      <v-col class="d-flex select-container" cols="5" md="3" lg="2">
        <v-select :items="countries" item-text="countryCode" label="Country" v-model="selectedCountry" outlined></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'dropdown',
  props: {
    countries: {
      type: Array,
      required: true,
    },
    months: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sortOptions: [
        {
          text: 'Ascending',
          value: 1,
        },
        {
          text: 'Descending',
          value: 2,
        },
      ],
    }
  },
  computed: {
    displayAll() {
      return this.$store.state.displayAll
    },
    dropdownState() {
      return this.$store.state.dropdownState
    },
    selectedMonth: {
      get() {
        return this.$store.state.selectedMonth
      },
      set(newValue) {
        this.$store.dispatch('changeSelectedMonth', newValue)
      },
    },
    selectedCountry: {
      get() {
        return this.$store.state.selectedCountry
      },
      set(newValue) {
        this.$store.dispatch('changeSelectedCountry', newValue)
      },
    },
    selectedSort: {
      get() {
        return this.$store.state.selectedSort
      },
      set(newValue) {
        this.$store.dispatch('changeSelectSort', newValue)
      },
    },
    searchText: {
      get() {
        return this.$store.state.searchText
      },
      set(newValue) {
        this.$store.dispatch('changeSearchText', newValue)
      },
    },
  },
}
</script>

<style scoped>
.filter-dropdown-container {
  padding-top: 0px;
  padding-bottom: 0px;
  overflow: hidden;
  max-height: 0px;
  transition: all 0.5s;
}

.filter-dropdown-container-open {
  max-height: 294px;
}

@media only screen and (min-width: 960px) {
  .filter-dropdown-container-open {
    max-height: 98px;
  }
}

.filter-dropdown-container .v-text-field {
  height: 86px;
}

.select-container {
  padding-bottom: 0px;
}
</style>
