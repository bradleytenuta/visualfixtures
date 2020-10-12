<template>
  <v-container
    class="filter-dropdown-container"
    :class="{ 'filter-dropdown-container-open': dropdownState, 'filter-dropdown-container-open-no-snippet': dropdownState }"
  >
    <!-- Filters the search results -->
    <!-- Layout for snippet view -->
    <v-row align="center" v-if="isSnippetStore">
      <!-- Search Bar -->
      <v-col id="comp-search-bar" class="d-flex select-container" cols="12" md="3" lg="5">
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
        <v-select id="select-month" :items="months" label="Month" v-model="selectedMonth" outlined :disabled="displayAll"></v-select>
      </v-col>

      <!-- Sort By Select -->
      <v-col class="d-flex select-container" cols="7" md="3" lg="2">
        <v-select id="select-sort" :items="sortOptions" label="Sort By" v-model="selectedSort" outlined></v-select>
      </v-col>

      <!-- Country Select -->
      <v-col class="d-flex select-container" cols="5" md="3" lg="2">
        <v-select
          id="select-country"
          :items="countries"
          item-text="countryCode"
          label="Country"
          v-model="selectedCountry"
          hide-selected
          outlined
        >
          <!-- HTML that describe how select should render selected items -->
          <template v-slot:selection="data">
            <country-flag :country="data.item.countryCode.toLowerCase()" size="normal" />
            {{ data.item.countryCode }}
          </template>
          <!-- HTML that describe how select should render items when the select is open -->
          <template v-slot:item="data">
            <country-flag :country="data.item.countryCode.toLowerCase()" size="normal" />
            {{ data.item.countryCode }}
          </template>
        </v-select>
      </v-col>
    </v-row>
    <!-- Layout for fixture page view -->
    <v-row align="center" v-else>
      <!-- Search Bar -->
      <v-col id="comp-search-bar" class="d-flex select-container" cols="12">
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
      <v-col class="d-flex select-container" cols="12">
        <v-select id="select-month" :items="months" label="Month" v-model="selectedMonth" outlined :disabled="displayAll"></v-select>
      </v-col>

      <!-- Sort By Select -->
      <v-col class="d-flex select-container" cols="7">
        <v-select id="select-sort" :items="sortOptions" label="Sort By" v-model="selectedSort" outlined></v-select>
      </v-col>

      <!-- Country Select -->
      <v-col class="d-flex select-container" cols="5">
        <v-select
          id="select-country"
          :items="countries"
          item-text="countryCode"
          label="Country"
          v-model="selectedCountry"
          hide-selected
          outlined
        >
          <!-- HTML that describe how select should render selected items -->
          <template v-slot:selection="data">
            <country-flag :country="data.item.countryCode.toLowerCase()" size="normal" />
            {{ data.item.countryCode }}
          </template>
          <!-- HTML that describe how select should render items when the select is open -->
          <template v-slot:item="data">
            <country-flag :country="data.item.countryCode.toLowerCase()" size="normal" />
            {{ data.item.countryCode }}
          </template>
        </v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  name: 'dropdown',
  components: {
    CountryFlag,
  },
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
  /**
   * All computed properties are obtained from Vuex.
   */
  computed: {
    displayAll() {
      return this.$store.state.displayAll
    },
    dropdownState() {
      return this.$store.state.dropdownState
    },
    isSnippetStore() {
      return this.$store.state.isSnippet
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

/* A set dropdown height for when the map is shown - only used when not a snippet */
.filter-dropdown-container-open-no-snippet {
  max-height: 294px !important;
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

/* Overwriting vue-country-flag css */
.flag {
  margin-left: -15px;
  margin-right: -10px;
}
</style>
