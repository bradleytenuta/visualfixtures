<template>
  <div class="d-flex filter-container">
    <!-- Toolbar Component -->
    <toolbar :dropdownState="dropdownState" :selectAllMonth="selectAllMonth" v-on:updateDropdownState="dropdownState = !dropdownState" />

    <!-- Dropdown Component -->
    <dropdown
      :countries="countries"
      :months="months"
      :searchText="searchText"
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
