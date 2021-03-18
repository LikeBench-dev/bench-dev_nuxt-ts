import axios from 'axios'
// export const ENDPOINT_API = 'http://localhost:6080'
export const DOMEN = 'http://bench-dev.ru'
export const ENDPOINT_API = ''
export const LOAD_API = axios.create({
  baseURL: `${ENDPOINT_API}`
})
export const ADD_IMG = axios.create({
  baseURL: `${ENDPOINT_API}`,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
export const ADD_API = axios.create({
  baseURL: `${ENDPOINT_API}`,
  headers: {
    'Content-Type': 'application/json'
  }
})
