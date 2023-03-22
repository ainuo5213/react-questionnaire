import axios, { AxiosRequestConfig } from 'axios'
import { Response } from '@/types'
import { message } from 'antd'

const instance = axios.create({
  baseURL: '',
  timeout: 10000
})

instance.interceptors.request.use(
  function (config) {
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default async function <T = any>(config: AxiosRequestConfig): Promise<Response<T>> {
  try {
    const response = await instance(config)
    const data = response as Response<T>
    if (data.status === 200) {
      return data.data
    } else {
      message.error(data.message)
      return Promise.reject(data.message)
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : (err as string)
    message.error(msg)
    return Promise.reject(err)
  }
}
