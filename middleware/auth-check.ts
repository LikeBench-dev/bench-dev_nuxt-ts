import { Middleware } from '@nuxt/types'

const authCheck: Middleware = (context) => {
  context.store.dispatch('user/initAuth', context.req)
}

export default authCheck
