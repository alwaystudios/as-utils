const convertSecondsToNanoseconds = (seconds: number): number => {
  return seconds * 1e9
}

const convertNanosecondsToMilliseconds = (nanoseconds: number): number => {
  return nanoseconds / 1e6
}

export const timeDiffMilliseconds = (timeDiff: [number, number]): number => {
  const nanosecondsElapsed = convertSecondsToNanoseconds(timeDiff[0]) + timeDiff[1]
  const millisecondsElapsed = convertNanosecondsToMilliseconds(nanosecondsElapsed)
  return Number(millisecondsElapsed.toFixed(0))
}

export const processTimer = (): (() => number) => {
  const startTime = process.hrtime()
  return () => {
    const diff = process.hrtime(startTime)
    return timeDiffMilliseconds(diff)
  }
}
