<template>
  <div class="wrapper" :class="setTheme">
    <Header ref="headerWidth" @headerWidth="resizeBlock" />

    <main class="wrapper-container" :style="{width: widthBlock}">
      <div class="errorPage">
        <h1 v-if="error.statusCode === 404" class="title">
          {{ pageNotFound }}
        </h1>
        <h1 v-else class="title">
          {{ otherError }}
        </h1>
        <NuxtLink :to="setRoute" class="btn btn-danger btn-link">
          На главную
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script>
import ThemeStore from '@/store/theme'

export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      widthBlock: '',
      store: ThemeStore.context(this.$store),
      pageNotFound: 'Страница не найдена',
      otherError: 'Неизвестная ошибка'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  computed: {
    setTheme () {
      return this.store.getters.getTheme
    },
    setRoute () {
      const fullPath = this.$route.fullPath.split('/')
      const lastPath = fullPath[fullPath.length - 1]
      if (lastPath === '') {
        const slash = '/' + fullPath[fullPath.length - 2] + '/'
        return this.$route.fullPath.replace(slash, '')
      } else {
        return this.$route.fullPath.replace(lastPath, '')
      }
    }
  },
  methods: {
    resizeBlock (width) {
      const body = document.body.offsetWidth
      const block = width
      this.widthBlock = `${body - block}px`
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
.errorPage {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}
</style>
