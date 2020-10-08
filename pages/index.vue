<template>
  <div>
    <!-- Title -->
    <title-view></title-view>

    <!-- Snippets -->
    <snippet></snippet>

    <!-- Providers -->
    <providers></providers>

    <!-- Footer -->
    <footer-view></footer-view>
  </div>
</template>

<script>
import titleView from '~/components/home/title-view.vue'
import snippet from '~/components/home/snippet.vue'
import providers from '~/components/home/providers.vue'
import footerView from '~/components/home/footer-view.vue'

export default {
  name: 'index',
  layout: 'home',
  components: {
    snippet,
    providers,
    'title-view': titleView,
    'footer-view': footerView,
  },
}
</script>
