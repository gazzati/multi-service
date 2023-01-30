import { Static, Type } from "@sinclair/typebox"

const GetStatsResponseSchema = Type.Object({
  visits: Type.Number()
})

const AddVisitResponseSchema = Type.Object({
  success: Type.Boolean()
})

export type GetStatsResponse = Static<typeof GetStatsResponseSchema>
type AddListResponse = Static<typeof AddVisitResponseSchema>

export interface GetStats {
  Reply: Reply<GetStatsResponse>
}

export interface AddVisit {
  Headers: {
    "real-ip": string
  }
  Reply: Reply<AddListResponse>
}

export const GetStatsSchema = {
  description: "Get stats",
  tags: ["Stat"],
  response: {
    200: GetStatsResponseSchema
  }
}

export const AddVisitSchema = {
  description: "Add visit",
  tags: ["Stat"],
  response: {
    200: AddVisitResponseSchema
  }
}
