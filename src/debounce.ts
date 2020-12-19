// eslint-disable-next-line @typescript-eslint/ban-types
export const debounce = <T extends Function>(callback: T, wait = 500) => {
  // eslint-disable-next-line functional/no-let
  let intervalId: NodeJS.Timeout | null

  const callable = (...args: any) => {
    if (intervalId) {
      clearTimeout(intervalId)
    }
    intervalId = setTimeout(() => callback(...args), wait)
  }
  return (callable as any) as T
}
