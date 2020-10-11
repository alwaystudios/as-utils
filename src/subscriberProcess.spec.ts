import { promiseRetry } from './promiseRetry'
import { promiseTimeout } from './promiseTimeout'
import { createSubscriberProcess } from './subscriberProcess'

describe('subscriberProcess', () => {
  it('polls for data and then processes that data', async () => {
    const processData = jest.fn()
    const pollerProcess = async () => {
      await promiseTimeout(100)
      return 'test data'
    }

    createSubscriberProcess(pollerProcess, processData, 200)

    await promiseRetry()(async () => {
      expect(processData).toHaveBeenCalledWith('test data')
      expect(processData).toHaveBeenCalledTimes(1)
    })
  })

  it('waits for data before starting a new polling process', async () => {
    const processData = jest.fn()
    const pollerProcess = async () => {
      await promiseTimeout(500)
      return 'test data'
    }

    createSubscriberProcess(pollerProcess, processData, 100)

    await promiseRetry()(async () => {
      expect(processData).toHaveBeenCalledWith('test data')
      expect(processData).toHaveBeenCalledTimes(1)
    })
  })

  it('processes multiple data', async () => {
    const processData = jest.fn()
    const pollerProcess = jest
      .fn()
      .mockResolvedValueOnce('test 1')
      .mockResolvedValueOnce('test 2')
      .mockResolvedValueOnce('test 3')

    createSubscriberProcess(pollerProcess, processData, 200)

    await promiseRetry()(async () => {
      expect(processData).toHaveBeenCalledTimes(3)
      expect(processData).toHaveBeenNthCalledWith(1, 'test 1')
      expect(processData).toHaveBeenNthCalledWith(2, 'test 2')
      expect(processData).toHaveBeenNthCalledWith(3, 'test 3')
    })
  })
})
