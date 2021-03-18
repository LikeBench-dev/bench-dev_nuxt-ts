export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  // mode: 'universal',
  ssr: false,
  target: 'static',

  server: {
    port: 8000 // default: 3000
  },

  head: {
    title: 'Bench Dev Разработка сайтов под ключ',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap' }
    ]
  },

  // Animation
  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  },

  // Переменные и миксины в глобальной области видимости
  styleResources: {
    scss: [
      '@/assets/scss/utils/vars.scss',
      'vue-material-design-icons/styles.css'
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~/assets/scss/main.scss', lang: 'scss' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/app-components', mode: 'client' },
    { src: '~/plugins/imgRename' },
    { src: '~/plugins/api' },
    { src: '~/plugins/transliteration' },
    { src: '~/plugins/vuex-persist', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    'nuxt-material-design-icons-iconfont'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loader: 'sass-loader',
    options: {
      indentedSyntax: true,
      data: '@import "@/assets/scss/utils/mixin.scss";'
    }
  },

  fontawesome: {
    component: 'fa',
    icons: {
      regular: true,
      brands: true
    }
  }
}
