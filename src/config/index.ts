import dotenv from "dotenv"
import Joi from "joi" // TODO: replace to TypeBox

import { Env } from "@interfaces/env"

dotenv.config()

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().valid(Env.Production, Env.Development, Env.Test).default(Env.Development),
  HOST: Joi.string().default("127.0.0.1").description("App Host"),
  PORT: Joi.number().default(3000).description("App Port"),

  PSQL_HOST: Joi.string().default("localhost").description("Database Host"),
  PSQL_DATABASE: Joi.string().default("database").description("Database Name"),
  PSQL_USER: Joi.string().default("root").description("Database User"),
  PSQL_PASSWORD: Joi.string().allow("").default("root").description("Database Password")
})

const { error, value: envVars } = envVarsSchema.validate(process.env)
if (error) new Error(`Config validation error: ${error.message}`)

export default {
  env: envVars.NODE_ENV,
  host: envVars.HOST,
  port: envVars.PORT,

  psqlHost: envVars.PSQL_HOST,
  psqlDatabase: envVars.PSQL_DATABASE,
  psqlUsername: envVars.PSQL_USER,
  psqlPassword: envVars.PSQL_PASSWORD
}

export { Env }
