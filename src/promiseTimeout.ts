export const promiseTimeout = async (timeout: number): Promise<void> =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, timeout)
  })
