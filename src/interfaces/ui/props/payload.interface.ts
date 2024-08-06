export interface Payload<T> {
  data: T | null
  message: string
  is_done: boolean
}
