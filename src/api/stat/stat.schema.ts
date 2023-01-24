import { Static, Type } from "@sinclair/typebox"

const AddVisitResponseSchema = Type.Object({
  success: Type.Boolean()
})

type AddListResponse = Static<typeof AddVisitResponseSchema>

export interface AddVisit {
  Headers: {
    "Real-IP": string
  }
  Reply: Reply<AddListResponse>
}

export const AddVisitSchema = {
  description: "Add visit",
  tags: ["Stat"],
  response: {
    200: AddVisitResponseSchema
  }
}
