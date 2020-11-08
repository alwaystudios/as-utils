import { promiseRetry } from './promiseRetry'

export const waitUntil = async (f: any) => {
  await promiseRetry()(async () => {
    await Promise.resolve(f())
  })
}
