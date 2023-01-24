import { FastifyInstance } from "fastify"
import { UAParser } from "ua-parser-js"

import { AddVisitSchema } from "./stat.schema"
import type { AddVisit } from "./stat.schema"
import StatService from "./stat.service"

async function statController(server: FastifyInstance) {
  const statService = new StatService()

  server.post<AddVisit>("/visit", { schema: AddVisitSchema }, async (request, reply) => {
    const { headers } = request
    const ip = headers["Real-IP"] || ""

    const parser = new UAParser(headers["user-agent"])
    const parserResults = parser.getResult()

    const response = await statService.addVisit(ip, parserResults)

    reply.send({ success: !!response })
  })
}

export default statController
