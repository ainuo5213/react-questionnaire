export type PaginationWrapper<T> = {
  total: number
  result: T[]
}

export type Response<T> = {
  message: string
  data: T
  status: number
}
