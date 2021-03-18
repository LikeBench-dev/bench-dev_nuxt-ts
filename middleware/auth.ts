import { Middleware } from '@nuxt/types'

const auth: Middleware = (context) => {
  if (!context.store.getters['user/checkAuthUser']) {
    context.redirect('/admin/auth')
  }
}

export default auth
