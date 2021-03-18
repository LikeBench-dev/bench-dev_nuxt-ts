import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $imgRename(message: string): void
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $imgRename(message: string): void
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $imgRename(message: string): void
  }
}

declare module 'vuex/types/index' {
  // this.$myInjectedFunction inside Vuex stores
  interface Store<S> {
    $imgRename(message: string): void
  }
}

const imageRename: Plugin = (context, inject) => {
  inject('imgRename', (message: string) => {
    message = context.app.$transliteration(message).toLowerCase().replace(/\s+/g, '').trim()

    return message
  })
}

export default imageRename
