import { addedDiff } from 'deep-object-diff'

export const deepPartialDiff = <T extends Record<string, unknown>>(
  selected: DeepPartial<T>,
  source: T,
): Partial<T> => {
  return addedDiff(selected, source)
}
