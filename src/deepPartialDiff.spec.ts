import { dissoc } from 'ramda'
import { deepPartialDiff } from './deepPartialDiff'

const data = {
  topKey1: {
    midKey1: 'value midKey 1',
    midKey2: 3,
  },
  topKey2: {
    midKey1: 33,
    midKey2: 'value midKey 2',
    midKey3: {
      lowKey: 444,
    },
  },
}

describe('deepPartialDiff', () => {
  it('returns source when selected is empty', () => {
    expect(deepPartialDiff({}, data)).toEqual(data)
  })

  it('returns empty object when selected is same as source', () => {
    expect(deepPartialDiff(data, data)).toEqual({})
  })

  it('filters out first level items when all related second items are sent', () => {
    expect(
      deepPartialDiff(
        {
          topKey1: {
            midKey1: '',
            midKey2: 12,
          },
        },
        data,
      ),
    ).toEqual(dissoc('topKey1', data))
  })

  it('does not filter out first level item when not all related second items are sent', () => {
    expect(
      deepPartialDiff(
        {
          topKey1: {
            midKey1: '',
          },
        },
        data,
      ),
    ).toEqual({
      ...data,
      ...{
        topKey1: {
          midKey2: 3,
        },
      },
    })
  })

  it('filters out items at first and second levels', () => {
    expect(
      deepPartialDiff(
        {
          topKey1: {
            midKey1: 'value midKey 1',
            midKey2: 3,
          },
          topKey2: {
            midKey1: 33,
            midKey2: 'value midKey 2',
            midKey3: {},
          },
        },
        data,
      ),
    ).toEqual({
      topKey2: {
        midKey3: {
          lowKey: 444,
        },
      },
    })
  })
})
