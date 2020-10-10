import { promiseTimeout } from './promiseTimeout'

const DEFAULT_ATTEMPTS = 10
const DEFAULT_TIMEOUT = 200

type RetryPromiseConfig = {
  attempts?: number
  timeout?: number
}

export const promiseRetry = <T>(config?: RetryPromiseConfig) => async (
  f: () => Promise<T>,
): Promise<T> => {
  const { attempts = DEFAULT_ATTEMPTS, timeout = DEFAULT_TIMEOUT } = config || {}
  return new Promise<T>((resolve, reject) => {
    return f()
      .then(resolve)
      .catch(async (error: Error) => {
        if (attempts === 0) {
          return reject(error)
        }
        await promiseTimeout(timeout)
        const result = promiseRetry<T>({ attempts: attempts - 1, timeout })(f)
        resolve(result)
      })
  })
}
