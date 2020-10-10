import { promiseTimeout } from './promiseTimeout'

describe('promiseTimeout', () => {
  it('runs a timeout as a promise', async () => {
    const start = new Date().getTime()
    await promiseTimeout(2000)
    const end = new Date().getTime()
    expect(end - start).toBeGreaterThanOrEqual(2000)
  })
})
