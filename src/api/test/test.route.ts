import { FastifyInstance } from "fastify"

import { TestItemSchema, TestListSchema, CreateTestSchema, UpdateTestSchema, DeleteTestSchema } from "./test.schema"
import type {
  TestItemRequest,
  TestListRequest,
  CreateTestRequest,
  UpdateTestRequest,
  DeleteTestRequest
} from "./test.schema"
import TestService from "./test.service"

async function testRoute(server: FastifyInstance) {
  const testService = new TestService()

  server.get<TestItemRequest>("/:id", { schema: TestItemSchema }, async (request, reply) => {
    const testId = Number(request.params.id)

    const response = await testService.get(testId)
    if (!response) return server.httpErrors.notFound()

    reply.send(response)
  })

  server.get<TestListRequest>("/", { schema: TestListSchema }, async (request, reply) => {
    const title = String(request.query.title) || ""
    const response = await testService.getList({ title })

    reply.send(response)
  })

  server.post<CreateTestRequest>("/", { schema: CreateTestSchema }, async (request, reply) => {
    const response = await testService.create(request.body)
    if (!response) return server.httpErrors.badRequest()

    reply.status(201)
  })

  server.patch<UpdateTestRequest>("/:id", { schema: UpdateTestSchema }, async (request, reply) => {
    const testId = Number(request.params.id)

    const response = await testService.update(testId, request.body)
    if (!response) return server.httpErrors.badRequest()

    reply.send()
  })

  server.delete<DeleteTestRequest>("/:id", { schema: DeleteTestSchema }, async (request, reply) => {
    const testId = Number(request.params.id)

    const response = await testService.delete(testId)
    if (!response) return server.httpErrors.badRequest()

    reply.status(204)
  })
}

export default testRoute
