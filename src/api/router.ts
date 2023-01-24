import statController from "@root/api/stat/stat.controller"
import testController from "@root/api/test/test.controller"

import type { FastifyInstance } from "fastify"

const router = (app: FastifyInstance) => {
  app.register(testController, { prefix: "/api/test" })
  app.register(statController, { prefix: "/api/stats" })
}

export default router
