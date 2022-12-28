import { Static, Type } from "@sinclair/typebox"

export const Error = Type.Object({
  statusCode: Type.Number(),
  message: Type.String(),
  error: Type.Optional(Type.String())
})

export type ErrorType = Static<typeof Error>
