import { promiseTimeout } from './promiseTimeout'
import { TaskQueue } from './taskQueue'
import waitForExpect from 'wait-for-expect'

const onError = jest.fn()
const onComplete = jest.fn()
const onEmpty = jest.fn()

const createQueue = (concurrency = 0) => {
  return new TaskQueue(concurrency)
    .on('empty', onEmpty)
    .on('error', onError)
    .on('complete', onComplete)
}

const createTask = (timeout = 0) => async () => promiseTimeout(timeout).then(() => Date.now())

describe('task queue', () => {
  beforeEach(jest.resetAllMocks)

  it('processes tasks sequentially added to the queue', async () => {
    const queue = createQueue(1)

    queue.addTask(createTask())
    await waitForExpect(() => {
      expect(onEmpty).toHaveBeenCalledTimes(1)
    })

    expect(onComplete).toHaveBeenCalledTimes(1)
    expect(onError).not.toHaveBeenCalled()

    queue.addTask(createTask())
    await waitForExpect(() => {
      expect(onEmpty).toHaveBeenCalledTimes(2)
    })

    expect(onComplete).toHaveBeenCalledTimes(2)
    expect(onError).not.toHaveBeenCalled()
  })

  it('runs within a concurrency limit', async () => {
    const tasks = [...Array(4)].map(() => createTask(1000))
    const queue = createQueue(2)
    tasks.forEach((task) => queue.addTask(task))

    await waitForExpect(() => {
      expect(onEmpty).toHaveBeenCalledTimes(1)
      expect(onComplete).toHaveBeenCalledTimes(tasks.length)
    })

    const task1Time = onComplete.mock.calls[0][0]
    const task2Time = onComplete.mock.calls[1][0]
    const task3Time = onComplete.mock.calls[2][0]
    const task4Time = onComplete.mock.calls[3][0]

    expect(Math.abs(task1Time - task2Time)).toBeLessThan(10)
    expect(Math.abs(task3Time - task4Time)).toBeLessThan(10)
    expect(Math.abs(task1Time - task4Time)).toBeGreaterThanOrEqual(1000)
    expect(Math.abs(task2Time - task3Time)).toBeGreaterThanOrEqual(1000)
    expect(onError).not.toHaveBeenCalled()
  })

  it('handles task errors', async () => {
    const error = new Error('boom')
    const errorTask = async () => {
      return Promise.reject(error)
    }

    createQueue(1).addTask(errorTask).addTask(createTask())

    await waitForExpect(() => {
      expect(onError).toHaveBeenCalledTimes(1)
      expect(onComplete).toHaveBeenCalledTimes(1)
    })
  })
})
