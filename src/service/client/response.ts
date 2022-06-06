import type { Response } from '~/src/types'
import type { HttpStatus } from '~/src/types/enums'

export function useResponse() {
  return {
    send<DataType>(status: HttpStatus, data: DataType): Response<DataType> {
      return {
        status,
        data
      }
    }
  }
}
