import { promiseRetry } from './promiseRetry'
import * as promiseTimeoutModule from './promiseTimeout'

const timeoutMock = jest.spyOn(promiseTimeoutModule, 'promiseTimeout').mockResolvedValue()

describe('promiseRetry', () => {
  beforeEach(jest.resetAllMocks)

  it('resolves a promise', async () => {
    const result = await promiseRetry()(async () => {
      return Promise.resolve(true)
    })
    expect(result).toEqual(true)
  })

  it('resolves a promise after a failed attempt', async () => {
    const func = jest.fn().mockRejectedValueOnce(new Error('boom')).mockResolvedValueOnce(true)
    const result = await promiseRetry()(func)
    expect(result).toEqual(true)
  })

  it('rejects a promise with default retries and default timeout', async () => {
    await expect(
      promiseRetry()(async () => {
        throw Error('boom')
      }),
    ).rejects.toThrowError()
    expect(timeoutMock).toHaveBeenCalledTimes(10)
    expect(timeoutMock).toHaveBeenCalledWith(200)
  })

  it('rejects a promise with custom retries and custom timeout', async () => {
    await expect(
      promiseRetry({ attempts: 2, timeout: 7 })(async () => {
        throw Error('boom')
      }),
    ).rejects.toThrowError()
    expect(timeoutMock).toHaveBeenCalledTimes(2)
    expect(timeoutMock).toHaveBeenCalledWith(7)
  })
})
