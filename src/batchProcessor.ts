const BATCH_SIZE = 100

export const batchProcessor = async <T>(
  data: T[],
  f: (data: T) => Promise<void>,
  batchSize = BATCH_SIZE,
): Promise<void> => {
  // eslint-disable-next-line functional/no-let
  let batch = []
  do {
    // eslint-disable-next-line functional/immutable-data
    batch = data.splice(0, batchSize)
    if (batch.length > 0) {
      await Promise.all(batch.map(f))
    }
  } while (batch.length)
}
