<template>
  <div>
    <p>hello</p>
    <nuxt-link to="/athletics">Athletics</nuxt-link>
    <snippet-view></snippet-view>
  </div>
</template>

<script>
import snippetView from '~/components/home/snippet-view.vue'

export default {
  name: 'index',
  layout: 'home',
  components: {
    'snippet-view': snippetView,
  },
}
</script>
