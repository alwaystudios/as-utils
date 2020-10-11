const runningState = (): [() => boolean, (running: boolean) => void] => {
  // eslint-disable-next-line functional/no-let
  let isRunning = false
  const setRunning = (running: boolean) => (isRunning = running)
  return [() => isRunning, setRunning]
}

export const createSubscriberProcess = <T>(
  pollerProcess: () => Promise<T>,
  processData: (data: T) => void,
  processError: (err: any) => void,
  interval: number,
): NodeJS.Timeout => {
  const [isRunning, setRunning] = runningState()

  const subscribe = async () => {
    if (isRunning()) {
      return
    }
    setRunning(true)
    pollerProcess()
      .then((data) => {
        processData(data)
        setRunning(false)
      })
      .catch((err) => {
        processError(err)
        setRunning(false)
      })
  }

  return setInterval(subscribe, interval)
}
