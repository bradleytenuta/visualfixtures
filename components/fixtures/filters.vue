<template>
  <div class="d-flex filter-container">
    <!-- Toolbar Component -->
    <toolbar :selectAllMonth="selectAllMonth" :dropdownState="dropdownState" />

    <!-- Dropdown Component -->
    <dropdown
      :countries="countries"
      :months="months"
      :searchText="searchText"
      :selectedMonth="selectedMonth"
      :selectedCountry="selectedCountry"
      :selectedSort="selectedSort"
      :selectAllMonth="selectAllMonth"
      :dropdownState="dropdownState"
    />
  </div>
</template>

<script>
import toolbar from '~/components/fixtures/filters/toolbar.vue'
import dropdown from '~/components/fixtures/filters/dropdown.vue'

export default {
  name: 'filters',
  components: {
    toolbar,
    dropdown,
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
    searchText: {
      type: String,
      required: true,
    },
    selectedMonth: {
      type: String,
      required: true,
    },
    selectedCountry: {
      type: Object,
      required: true,
    },
    selectedSort: {
      type: Number,
      required: true,
    },
    selectAllMonth: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      dropdownState: false,
    }
  },
}
</script>
