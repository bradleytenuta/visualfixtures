<template>
  <div>
    <!-- Filters Menu -->
    <filters />

    <!-- Fixture List -->
    <list />
  </div>
</template>

<script>
import filters from '~/components/fixtures/filters.vue'
import list from '~/components/fixtures/list.vue'

export default {
  name: 'calendar',
  components: {
    filters,
    list,
  },
}
</script>

<style scoped></style>
