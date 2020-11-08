import { waitUntil } from './waitUntil'

describe('waitUntil', () => {
  beforeEach(jest.resetAllMocks)

  it('waits for a synchronous function to return without throwing exception', async () => {
    const func = jest
      .fn()
      .mockImplementationOnce(() => {
        throw Error('boom')
      })
      .mockReturnValueOnce(true)

    await waitUntil(() => func())
    expect(func).toHaveBeenCalledTimes(2)
  })

  it('waits for an asynchronous function to return without throwing exception', async () => {
    const func = jest.fn().mockRejectedValueOnce(false).mockReturnValueOnce(true)

    await waitUntil(() => func())
    expect(func).toHaveBeenCalledTimes(2)
  })
})
