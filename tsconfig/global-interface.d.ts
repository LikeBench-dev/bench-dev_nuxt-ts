/**
 * Global interfaces in Nuxt Project
 */

import Vue from 'vue'
declare module '*.vue' {
  export default Vue
}

export interface ProductData {
  date: string
  title: string
  description: string
  img: string
  url: string
  id?: number|string|any
  file?: Blob|any
}

export interface AlertData {
  type: string|null
  value: string
}

export interface UserData {
  email: string
  password: number|string
}

export interface LinksData {
  title: string
  url: string
  icon: string
}
