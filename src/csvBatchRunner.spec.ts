import { csvBatchRunner, readCsv } from './csvBatchRunner'

const filename = `${__dirname}/../test.csv`

describe('csvBatchRunner', () => {
  beforeEach(jest.resetAllMocks)

  it('runs a batch process for a csv file', async () => {
    const f = jest.fn().mockImplementation((data: any) => {
      console.log(data)
    })
    const onError = jest.fn().mockImplementation((err: any) => {
      console.error(err)
    })
    await csvBatchRunner({ filename, f, onError })
    expect(f).toHaveBeenCalledTimes(2)
    expect(onError).not.toHaveBeenCalled()
  })

  it('handles errors from the batch processor', async () => {
    const f = jest.fn().mockRejectedValue(false)
    const onError = jest.fn().mockImplementation((err: any) => {
      console.error(err)
    })
    await csvBatchRunner({ filename, f, onError })
    expect(onError).toHaveBeenCalledTimes(1)
  })
})

describe('readCsv', () => {
  it('reads a csv file', async () => {
    const onError = jest.fn()
    const data = await readCsv(filename, onError)
    expect(data).toEqual([
      ['test1', 'test2', 'test3'],
      ['test4', 'test5', 'test6'],
    ])
  })
})
