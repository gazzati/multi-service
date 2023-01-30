import { FastifyInstance } from "fastify"
import { UAParser } from "ua-parser-js"

import { GetStatsSchema, AddVisitSchema } from "./stat.schema"
import type { GetStats, AddVisit } from "./stat.schema"
import StatService from "./stat.service"

async function statController(server: FastifyInstance) {
  const statService = new StatService()

  server.get<GetStats>("/", { schema: GetStatsSchema }, async (_, reply) => {
    const response = await statService.getStats()

    reply.send(response)
  })

  server.post<AddVisit>("/visit", { schema: AddVisitSchema }, async (request, reply) => {
    const { headers } = request
    const ip = headers["real-ip"] || ""

    const parser = new UAParser(headers["user-agent"])
    const parserResults = parser.getResult()

    const response = await statService.addVisit(ip, parserResults)

    reply.send({ success: !!response })
  })
}

export default statController
