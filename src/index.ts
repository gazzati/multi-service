import "./aliases"
import testRoute from "@api/test/test.route"
import fastifySensible from "@fastify/sensible"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import fastify from "fastify"

import config from "@config/index"
import pinoLogger from "@config/pino-logger"
import swaggerDoc from "@config/swagger"

const app = fastify({
  logger: pinoLogger
  //ignoreTrailingSlash: true,
})

app.after(() => {
  app.register(fastifySwagger)
  app.register(fastifySwaggerUi, swaggerDoc)
  app.register(fastifySensible)

  app.register(testRoute, { prefix: "/api/test" })
})

const start = async () => {
  try {
    await app.listen({ port: config.port })
  } catch (error) {
    console.error(error)
  }
}

start()
