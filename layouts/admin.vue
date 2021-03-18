<template>
  <div class="wrapper" :class="setTheme">
    <Header ref="headerWidth" @headerWidth="resizeBlock" />

    <main class="wrapper-container admin-layout" :style="{width: widthBlock}">
      <Nuxt />
    </main>
    <AppAlert />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ThemeStore from '@/store/theme'
import Header from '@/components/system/Header.vue'

export default Vue.extend({
  components: { Header },
  middleware: ['auth-check', 'auth'],
  data () {
    return {
      widthBlock: '',
      store: ThemeStore.context(this.$store)
    }
  },
  computed: {
    setTheme (): string {
      return this.store.getters.getTheme
    }
  },
  methods: {
    resizeBlock (width): void {
      const body: number = document.body.offsetWidth
      const block: number = width
      this.widthBlock = `${body - block}px`
    }
  }
})
</script>
