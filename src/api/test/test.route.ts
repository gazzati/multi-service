import { FastifySchema, FastifyPluginAsync } from "fastify"
import { Static, Type } from "@sinclair/typebox"
import { RouteGenericInterface } from "fastify/types/route"

const TestDto = Type.Object({
  user: Type.Object({
    email: Type.String({ format: "email" }),
    password: Type.String()
  })
})

type TestDtoType = Static<typeof TestDto>

const TestReply = Type.Object({
  hello: Type.String()
})

type TestReplyType = Static<typeof TestReply>

interface RegisterRequest extends RouteGenericInterface {
  Body: TestDtoType
  Reply: TestReplyType
}

const TestSchema: FastifySchema = {
  //body: TestDto,
  description: "Sign up a user",
  tags: ["Authentication"],
  summary: "sign up",
  response: {
    201: TestReply,
    400: TestReply
  }
}

const testRoute: FastifyPluginAsync = async server => {
  server.get<RegisterRequest>("/", { schema: TestSchema }, async (request, reply) => {
    reply.status(201).send({ hello: "test" })
  })
}

export default testRoute
