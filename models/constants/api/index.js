import { LOAD_API, ADD_IMG, ADD_API } from '@/models/constants/api/checkpoint'

export default () => {
  return {
    load () {
      return LOAD_API.get('/api/load')
    },
    addImg (project) {
      return ADD_IMG.post('/api/upload', project)
    },
    addItem (project) {
      return ADD_API.post('/api/fb', project)
    },
    changeItem (project) {
      return ADD_API.post('/api/change', project)
    },
    deleteItem (payload) {
      return ADD_API.post('/api/delete', payload)
    },
    changeDeleteImg (payload) {
      return ADD_API.post('/api/change-img', payload)
    },
    loadProject (id) {
      return ADD_API.post('/api/item', id)
    },
    authUser (user) {
      return ADD_API.post('/api/auth-user', user)
    },
    registerUser (user) {
      return ADD_API.post('/api/registration-user', user)
    },
    sendMessageBot (message) {
      return ADD_API.post('api/send', message)
    }
  }
}
