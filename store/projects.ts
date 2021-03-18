// Импорт базовых классов
import { Getters, Mutations, Actions, Module, Context } from 'vuex-smart-module'
import axios from 'axios'
import { Store } from 'vuex'
import { ProductData } from '../tsconfig/global-interface'
import AlertStore from './alert'
import UserStore from './user'

class ProjectState {
  public projects: ProductData[] = []
}

// Геттеры

class ProjectGetters extends Getters<ProjectState> {
  get getProjects (): Array<ProductData> {
    return this.state.projects
  }

  get getProjectsLength (): number {
    return this.state.projects.length
  }
}

// Мутации
class ProjectMutations extends Mutations<ProjectState> {
  public updateUserInfo (data: ProductData) {
    this.state.projects = { ...this.state.projects, ...data }
  }

  public addProject (project: ProductData) {
    this.state.projects.push(project)
  }

  public loadProject (projects: ProductData[]) {
    this.state.projects = projects.reverse()
  }
}
//

// Действия
class ProjectActions extends Actions<
  ProjectState,
  ProjectGetters,
  ProjectMutations,
  ProjectActions
  > {
  alert!: Context<typeof AlertStore>;
  user!: Context<typeof UserStore>;
  store!: Store<any>

  $init (store: Store<any>): Promise<any> {
    this.store = store
    this.alert = AlertStore.context(store)
    this.user = UserStore.context(store)
    return Promise.all([
      this.actions.loadProjects()
    ])
  }

  async loadProjects () {
    try {
      // const allProjects: ProductData[] = (await axios.get('http://localhost:6080/api/load')).data
      const allProjects: ProductData[] = (await axios.get('/api/load')).data
      if (allProjects.length === 0) {
        await this.alert.actions.callAlert({ type: 'error', value: 'Товара не обнаружено' })
      }
      return this.commit('loadProject', allProjects)
    } catch (e) {
      const error = new Error(e)
      await this.alert.actions.callAlert({ type: 'error', value: 'Ошибка загрузки файлов' })
      return error
    }
  }

  async addProject (project: ProductData|any) {
    try {
      const store: any = this.store
      await store.$api.addItem({ project: project[0], token: this.user.state.token })
      await store.$api.addImg(project[1].file)
      await this.alert.actions.callAlert({ type: 'success', value: 'Добавлено' })
      return this.actions.loadProjects()
    } catch (e) {
      const error = new Error(e)
      await this.alert.actions.callAlert({ type: 'error', value: 'Ошибка' })
      return error
    }
  }

  async changeProject (project: ProductData|any) {
    try {
      const store: any = this.store
      await store.$api.changeItem({ project: project[0], token: this.user.state.token })
      if (project[1]) {
        await store.$api.addImg(project[1].file)
        await store.$api.changeDeleteImg({ imgName: project[2].oldImg })
      }
      await this.alert.actions.callAlert({ type: 'success', value: 'Изменения сохранены' })
      return this.actions.loadProjects()
    } catch (e) {
      const error = new Error(e)
      await this.alert.actions.callAlert({ type: 'error', value: 'Ошибка' })
      return error
    }
  }

  async deleteProject (project: ProductData|any) {
    try {
      const store: any = this.store
      await store.$api.deleteItem({ project: { ...project }, token: this.user.state.token })
      await this.alert.actions.callAlert({ type: 'success', value: 'Успешное удаление' })
      return this.actions.loadProjects()
    } catch (e) {
      const error = new Error(e)
      await this.alert.actions.callAlert({ type: 'error', value: 'Ошибка при удалении' })
      return error
    }
  }
}

// Экспорт модуля
export default new Module({
  state: ProjectState,
  getters: ProjectGetters,
  mutations: ProjectMutations,
  actions: ProjectActions
})
