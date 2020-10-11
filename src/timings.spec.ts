import { promiseTimeout } from './promiseTimeout'
import { timeDiffMilliseconds, processTimer } from './timings'

describe('timeDiffMilliseconds()', () => {
  it('calculates time differences with zero seconds', () => {
    expect(timeDiffMilliseconds([0, 1000000])).toBe(1)
  })

  it('calculates time differences with more than 1 second', () => {
    expect(timeDiffMilliseconds([1, 1000000])).toBe(1001)
  })
})

describe('processTimer', () => {
  it('tracks time for an operation', async () => {
    const start = new Date().getTime()
    const stopTimer = processTimer()
    await promiseTimeout(200)
    const end = new Date().getTime()
    expect(stopTimer()).toBeGreaterThanOrEqual(end - start - 1)
  })
})
