# as-utils

https://www.npmjs.com/package/@alwaystudios/as-utils

```
yarn add @alwaystudios/as-utils
```

## promiseRetry

Retry a promise for customizable delay time and number of attempts

Defaults: attempts = 10, timeout = 200

```
  const result = await promiseRetry()(someAsyncFunction)

  const result = await promiseRetry({ attempts: 2, timeout: 200 })(someAsyncFunction)
```

## promiseTimeout

setTimeout as a promise

```
  await promiseTimeout(2000)
```

## processTimer

time the duration of a process

```
  const start = new Date().getTime()
  const stopTimer = processTimer()
  await promiseTimeout(200)
  const duration = stopTimer()
```

## concatenate

concatenates a variable array of strings ignoring falsy values

```
  concatenate('a', 'b', '', null, false, undefined, 'c') // = 'a b c'
```

## encrypt

encrypts a string using aes-256-cbc

```
  const hash = encrypt(dataToEncrypt, key)
```

## decrypt

decrypts a string using aes-256-cbc

```
  const hash = encrypt(dataToEncrypt, key)
  const decryptedData = decrypt(hash, key)
```

## createSubscriberProcess

creates a subscriber process that will run a poller process on a given interval and then process that data

```
  createSubscriberProcess(pollerProcessAsyncFunction, processDataFunction, processErrorFunction, 200)
```

## batchProcessor

Processes data in batches (default batch size = 100)

```
  await batchProcessor(data, func, batchSize)
```

## csvBatchRunner

Reads a csv and runs a processor function (default batch size = 100)

```
  await csvBatchRunner({ filename, f, onError: onErrorFunction, batchSize })
```

## readCsv

Reads data from a csv file

```
  const data = await readCsv(filename, onErrorFunction)
```

## isPlainObject

```
  if(isPlainObject({ test: 'test' })) {
    // do something
  }
```

## kebabify, dekebabify

normal text
kebabified-text
