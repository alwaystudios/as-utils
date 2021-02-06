import { EventEmitter } from 'events'

export type Task<T> = () => Promise<T>

export class TaskQueue<T> extends EventEmitter {
  concurrency: number
  running: number
  queue: Task<T>[]

  constructor(concurrency: number) {
    super()
    this.concurrency = concurrency
    this.running = 0
    this.queue = []
  }

  next() {
    if (this.running === 0 && this.queue.length === 0) {
      return this.emit('empty')
    }

    while (this.running < this.concurrency && this.queue.length) {
      // eslint-disable-next-line functional/immutable-data
      const task = this.queue.shift()!
      // eslint-disable-next-line functional/immutable-data
      this.running++
      task()
        .then((res) => this.emit('complete', res))
        .catch((err) => this.emit('error', err))
        .finally(() => {
          // eslint-disable-next-line functional/immutable-data
          this.running--
          process.nextTick(this.next.bind(this))
        })
    }

    return
  }

  addTask(task: Task<T>) {
    // eslint-disable-next-line functional/immutable-data
    this.queue.push(task)
    process.nextTick(this.next.bind(this))
    return this
  }
}
