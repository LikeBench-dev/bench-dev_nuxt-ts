import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    /* your options */
    key: 'bench-dev',
    modules: [
      'user',
      'theme'
    ]
  }).plugin(store)
}
