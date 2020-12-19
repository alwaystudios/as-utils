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

## sentenceCase

Capitalise the first character of the first word in a sentence

## truthy

```
  [1, 2, undefined, null, 0].filter(truthy) // returns [1, 2]
```

## waitUntil

```
  await waitUntil(() => expect(mock).toHaveBeenCalledTimes(1))
```

## removeUndefined

Removes undefined keys from an object

## debounce

Debounce a function with a given timeout (default = 500)

```
  const timeout = 1000
  const debouncedFunc = debounce(myFunc, timeout)

  debouncedFunc(1)
  debouncedFunc(2)
  debouncedFunc(3) // myFunc is called with 3
```

## deepPartialDiff

```
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

  deepPartialDiff({ topKey1: {} }, data) // = data

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
      ) // = {
      topKey2: {
        midKey3: {
          lowKey: 444,
        },
      },
    }
```
