import { promiseRetry } from './promiseRetry'
import { promiseTimeout } from './promiseTimeout'
import { createSubscriberProcess } from './subscriberProcess'

describe('subscriberProcess', () => {
  afterEach(jest.resetAllMocks)
  const processData = jest.fn()
  const processError = jest.fn()

  it('polls for data and then processes that data', async () => {
    const pollerProcess = async () => {
      await promiseTimeout(100)
      return 'test data'
    }

    const id = createSubscriberProcess(pollerProcess, processData, processError, 200)

    await promiseRetry()(async () => {
      expect(processData).toHaveBeenCalledWith('test data')
      expect(processData).toHaveBeenCalledTimes(1)
      expect(processError).not.toHaveBeenCalled()
    })
    clearInterval(id)
  })

  it('waits for data before starting a new polling process', async () => {
    const pollerProcess = async () => {
      await promiseTimeout(500)
      return 'test data'
    }

    const id = createSubscriberProcess(pollerProcess, processData, processError, 100)

    await promiseRetry()(async () => {
      expect(processData).toHaveBeenCalledWith('test data')
      expect(processData).toHaveBeenCalledTimes(1)
      expect(processError).not.toHaveBeenCalled()
    })
    clearInterval(id)
  })

  it('processes multiple data', async () => {
    const pollerProcess = jest
      .fn()
      .mockResolvedValueOnce('test 1')
      .mockResolvedValueOnce('test 2')
      .mockResolvedValueOnce('test 3')

    const id = createSubscriberProcess(pollerProcess, processData, processError, 200)

    await promiseRetry()(async () => {
      expect(processData).toHaveBeenCalledTimes(3)
      expect(processError).not.toHaveBeenCalled()
    })
    clearInterval(id)
  })

  it('continues to poll on error', async () => {
    const pollerProcess = async () => {
      await promiseTimeout(100)
      throw Error('boom')
    }

    const id = createSubscriberProcess(pollerProcess, processData, processError, 200)

    await promiseRetry()(async () => {
      expect(processError).toHaveBeenCalled()
      expect(processError).toHaveBeenCalledWith(new Error('boom'))
      expect(processData).not.toHaveBeenCalled()
    })
    clearInterval(id)
  })
})
