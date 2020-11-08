import { truthy } from './truthy'

describe('truthy', () => {
  it('removes non-values', () => {
    const list = [1, 2, undefined, null, 0]
    expect(list.filter(truthy)).toEqual([1, 2])
  })
})
