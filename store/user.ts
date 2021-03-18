// Импорт базовых классов
import { Getters, Mutations, Actions, Module, Context } from 'vuex-smart-module'
import { Store } from 'vuex'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Cookie from 'js-cookie'
import { UserData } from '@/tsconfig/global-interface'
import AlertStore from './alert'

class UserState {
  token: string | null = null
}

// Геттеры
class UserGetters extends Getters<UserState> {
  get getToken (): boolean {
    return this.state.token !== null
  }

  get checkAuthUser () {
    return this.state.token != null
  }
}

// Мутации
class UserMutations extends Mutations<UserState> {
  public setToken (token: string) {
    this.state.token = token
  }

  public destroyToken () {
    this.state.token = null
  }
}

// Действия
class UserActions extends Actions<
  UserState,
  UserGetters,
  UserMutations,
  UserActions
  > {
  alert!: Context<typeof AlertStore>;
  store!: Store<any>

  $init (store: Store<any>): any {
    this.store = store
    this.alert = AlertStore.context(store)
  }

  public initAuth (req: any) {
    let token

    // Check Cookie
    if (req) {
      if (!req.headers.cookie) { return false }
      const jwtCookie = req.headers.cookie
        .split(';')
        .find((t: string) => t.trim().startsWith('jwt='))
      if (!jwtCookie) { return false }
      token = jwtCookie.split('=')[1]
    } else {
      // Check Token
      token = this.state.token
      if (!token) { return false }
    }
  }

  async authUser (user: UserData) {
    try {
      const store: any = this.store
      const token = (await store.$api.authUser(user)).data
      await this.commit('setToken', token)
      await Cookie.set('jwt', token)
      return this.alert.actions.callAlert({ type: 'success', value: 'Добро пожаловать!' })
    } catch (e) {
      const error = new Error('Пользователя не существует')
      await this.alert.actions.callAlert({
        type: 'error',
        value: 'Пользователя не существует'
      })
      return error
    }
  }

  async registerUser (user: UserData) {
    try {
      const store: any = this.store
      const newUser = (await store.$api.registerUser(user))
      console.log(newUser)
      return this.alert.actions.callAlert({ type: 'success', value: 'Успешная регистрация' })
    } catch (e) {
      const error = new Error('Ошибка регистрации')
      await this.alert.actions.callAlert({ type: 'error', value: 'Ошибка при регистрации' })
      return error
    }
  }

  public logoutUser () {
    this.commit('destroyToken')
    Cookie.remove('jwt')
  }
}

// Экспорт модуля
export default new Module({
  state: UserState,
  getters: UserGetters,
  mutations: UserMutations,
  actions: UserActions
})
