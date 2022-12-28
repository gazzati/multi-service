import { Static, Type } from "@sinclair/typebox"

import { Error } from "@interfaces/api"

const STestItem = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  email: Type.String({ format: "email" })
})

const STestList = Type.Array(STestItem)
const SCreateTest = Type.Omit(STestItem, ["id"])
const SUpdateTest = Type.Partial(SCreateTest)

export type TestItem = Static<typeof STestItem>
export type TestList = Static<typeof STestList>
export type CreateTest = Static<typeof SCreateTest>
export type UpdateTest = Static<typeof SUpdateTest>

export interface TestItemRequest {
  Params: {
    id: string
  }
  Reply: Reply<TestItem>
}

export interface TestListRequest {
  Querystring: {
    from: string
  }
  Reply: Reply<TestList>
}

export interface CreateTestRequest {
  Body: CreateTest
  Reply: Reply<TestItem>
}

export interface UpdateTestRequest {
  Body: UpdateTest
  Params: {
    id: string
  }
  Reply: Reply<TestItem>
}

export interface DeleteTestRequest {
  Params: {
    id: string
  }
}

export const TestItemSchema = {
  description: "Get test",
  tags: ["Test"],
  params: {
    id: Type.String()
  },
  response: {
    200: STestItem,
    400: Error,
    404: Error
  }
}

export const TestListSchema = {
  description: "Get tests list",
  tags: ["Test"],
  querystring: {
    from: Type.Optional(Type.String())
  },
  response: {
    200: STestList
  }
}

export const CreateTestSchema = {
  description: "Create test",
  tags: ["Test"],
  body: SCreateTest,
  response: {
    201: STestItem,
    400: Error
  }
}

export const UpdateTestSchema = {
  description: "Update test",
  tags: ["Test"],
  params: {
    id: Type.String()
  },
  body: SUpdateTest,
  response: {
    201: STestItem,
    400: Error
  }
}

export const DeleteTestSchema = {
  description: "Delete test",
  tags: ["Test"],
  params: {
    id: Type.String()
  },
  response: {
    204: {},
    400: Error
  }
}
