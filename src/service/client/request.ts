import type { Request, Middleware } from '~/src/types'

export function useRequest<T, K>(req: Request<T, K>) {
  return {
    use(middlewareCollection: Middleware<T, K>[]) {
      if (Array.isArray(middlewareCollection) && middlewareCollection.length) {
        middlewareCollection.forEach((middleware, removeIndex) => {
          middlewareCollection.splice(removeIndex, 1)
          req = useRequest<T, K>(middleware(req)).use(middlewareCollection)
        })
      }

      return req
    }
  }
}
