# as-utils

## promiseRetry

Retry a promise for customizable delay time and number of attempts

Default attempts = 10
Default timeout = 200

```
  const result = await promiseRetry()(someAsyncFunction)

  const result = await promiseRetry({ attempts: 2, timeout: 200 })(someAsyncFunction)
```

## promiseTimeout

setTimeout as a promise

```
  await promiseTimeout(2000)
```
