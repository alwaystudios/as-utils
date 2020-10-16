import { batchProcessor } from './batchProcessor'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const csvReader = require('promised-csv')

const BATCH_SIZE = 100

export const readCsv = (file: string, onError: (err: any) => void): Promise<any[]> => {
  return new Promise<any[]>((resolve) => {
    const reader = new csvReader()
    const rows: any[] = []

    // eslint-disable-next-line functional/immutable-data
    reader.on('row', (data: any) => rows.push(data))
    reader.on('error', onError)

    return reader.read(file, rows).then(() => resolve(rows))
  })
}

export const csvBatchRunner = async ({
  filename,
  batchSize = BATCH_SIZE,
  f,
  onError,
}: {
  filename: string
  batchSize?: number
  f: (data: any) => Promise<void>
  onError: (err: any) => void
}): Promise<void> => {
  await readCsv(filename, onError)
    .then(async (rows) => {
      await batchProcessor(rows, f, batchSize)
    })
    .catch(onError)
}
