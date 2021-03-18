// Импорт базовых классов
import { Getters, Mutations, Actions, Module } from 'vuex-smart-module'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

class ThemeState {
  theme: string = 'theme-light'
}

// Геттеры
class ThemeGetters extends Getters<ThemeState> {
  get getTheme (): string {
    return this.state.theme
  }
}

// Мутации
class ThemeMutations extends Mutations<ThemeState> {
  public changeTheme (theme: string) {
    this.state.theme = theme
  }
}

// Действия
class ThemeActions extends Actions<
  ThemeState,
  ThemeGetters,
  ThemeMutations,
  ThemeActions
  > {
  public changeTheme (theme: string) {
    this.commit('changeTheme', theme)
  }
}


// Экспорт модуля
export default new Module({
  state: ThemeState,
  getters: ThemeGetters,
  mutations: ThemeMutations,
  actions: ThemeActions
})
