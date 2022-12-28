import type { ErrorType } from "@interfaces/api"

declare global {
  type Reply<T> = ErrorType | T
  // type ControllerBodyRequest<T> = RequestType<any, T>
}
