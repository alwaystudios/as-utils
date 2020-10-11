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
