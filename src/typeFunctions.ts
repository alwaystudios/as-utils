const proto = Object.prototype
const { toString } = proto
const { getPrototypeOf } = Object

export const isPlainObject = (v: any): boolean => {
  if (typeof v !== 'object' || v === null || toString.call(v) !== '[object Object]') return false

  const prototype = getPrototypeOf(v)
  return prototype === null || prototype === proto
}

export const removeUndefined = (data: Record<string, unknown>) =>
  Object.entries(data).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

export const getProperty = <T, K extends keyof T>(obj: T, key: K) => {
  return obj[key]
}
