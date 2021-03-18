import { Plugin } from '@nuxt/types'
import API from '@/models/constants/api/index.js'

declare module 'vue/types/vue' {
  interface Vue {
    $api(): void
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $api(): void
  }
}

const api: Plugin = (context, inject) => {
  inject('api', API())
}

export default api
