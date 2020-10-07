<template>
  <div>
    <!-- Title -->
    <title-view></title-view>

    <!-- Snippets -->
    <snippet-view></snippet-view>
  </div>
</template>

<script>
import titleView from '~/components/home/title-view.vue'
import snippetView from '~/components/home/snippet-view.vue'

export default {
  name: 'index',
  layout: 'home',
  components: {
    'snippet-view': snippetView,
    'title-view': titleView,
  },
}
</script>
