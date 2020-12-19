import { debounce } from './debounce'
import { waitUntil } from './waitUntil'

describe('debounce', () => {
  it('debounces a function call', async () => {
    const aFunc = jest.fn()

    const myFuncToDebounce = (value: number) => {
      aFunc(value)
    }

    const callFunc = debounce(myFuncToDebounce)

    callFunc(1)
    callFunc(2)
    callFunc(3)
    callFunc(4)

    await waitUntil(() => {
      expect(aFunc).toHaveBeenCalledWith(4)
    })

    expect(aFunc).toHaveBeenCalledTimes(1)
  })
})
