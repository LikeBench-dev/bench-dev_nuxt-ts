// Импорт базовых классов
import { Getters, Mutations, Actions, Module } from 'vuex-smart-module'
import { AlertData } from '../tsconfig/global-interface'

class AlertState {
  public alertType: boolean|any = null
  public alertValue: string = ''
}

// Геттеры
class AlertGetters extends Getters<AlertState> {
  get getAlertType () {
    return this.state.alertType
  }

  get getAlertValue () {
    return this.state.alertValue
  }
}

// Мутации
class AlertMutations extends Mutations<AlertState> {
  public callAlert (info: AlertData) {
    this.state.alertType = info.type
    this.state.alertValue = info.value
  }
}

// Действия
class AlertActions extends Actions<
  AlertState,
  AlertGetters,
  AlertMutations,
  AlertActions
  > {
  async callAlert (info: AlertData) {
    await this.commit('callAlert', info)
    return setTimeout(() => {
      this.commit('callAlert', { type: null, value: '' })
    }, 3000)
  }
}

// Экспорт модуля
export default new Module({
  state: AlertState,
  getters: AlertGetters,
  mutations: AlertMutations,
  actions: AlertActions
})
