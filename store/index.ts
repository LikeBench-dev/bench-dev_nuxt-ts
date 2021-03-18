import { Module, createStore } from 'vuex-smart-module'
import theme from './theme'
import projects from './projects'
import alert from './alert'
import user from './user'

const root = new Module({
  modules: {
    theme,
    projects,
    alert,
    user
  }
})

const options = root.getStoreOptions()

export const {
  state,
  getters,
  mutations,
  actions,
  modules,
  plugins
} = options

export const store = createStore(root)
