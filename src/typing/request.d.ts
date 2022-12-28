import type { ErrorType } from "@interfaces/api"

declare global {
  type Reply<T = { success: boolean }> = ErrorType | T
  // type ControllerBodyRequest<T> = RequestType<any, T>
}
