import type { HttpStatus } from './enums'

export type Request<ParamsType, DataType> = {
  params?: ParamsType
  data: DataType
}

export type Response<T> = {
  status: HttpStatus
  data: T | unknown
}

export type Middleware<T, K> = (ctx: Request<T, K>) => Request<T, K>
