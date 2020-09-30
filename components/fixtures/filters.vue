<template>
  <div class="d-flex filter-container">
    <!-- Toolbar Component -->
    <toolbar />

    <!-- Dropdown Component -->
    <dropdown />
  </div>
</template>

<script>
import toolbar from '~/components/fixtures/filters/toolbar.vue'
import dropdown from '~/components/fixtures/filters/dropdown.vue'
export default {
  components: {
    toolbar,
    dropdown,
  },
  name: 'filters',
}
</script>

<style scoped></style>
