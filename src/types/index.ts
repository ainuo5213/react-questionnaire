export type PaginationWrapper<T = unknown> = {
  data: T[]
  total: number
}

export type Response<T> = {
  message: string
  data: T
  status: number
}
