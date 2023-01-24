import { FastifyInstance } from "fastify"
import { UAParser } from "ua-parser-js"

import { AddVisitSchema } from "./stat.schema"
import type { AddVisit } from "./stat.schema"
import StatService from "./stat.service"

async function statController(server: FastifyInstance) {
  const statService = new StatService()

  server.post<AddVisit>("/visit", { schema: AddVisitSchema }, async (request, reply) => {
    const parser = new UAParser(request.headers["user-agent"])
    const parserResults = parser.getResult()

    const response = await statService.addVisit(request.ip, parserResults)

    reply.send({ success: !!response })
  })
}

export default statController
