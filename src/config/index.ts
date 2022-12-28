import { Type } from "@sinclair/typebox"
import dotenv from "dotenv"

import { Env } from "@interfaces/env"

dotenv.config()

const envVarsSchema = Type.Object({
  NODE_ENV: Type.String().valid(Env.Production, Env.Development, Env.Test).default(Env.Development),
  PORT: Type.Number().default(3000).description("App Port"),

  PSQL_HOST: Type.String().default("localhost").description("Database Host"),
  PSQL_DATABASE: Type.String().default("database").description("Database Name"),
  PSQL_USER: Type.String().default("root").description("Database User"),
  PSQL_PASSWORD: Type.String().allow("").default("root").description("Database Password")
})

const { error, value: envVars } = envVarsSchema.validate(process.env)
if (error) new Error(`Config validation error: ${error.message}`)

export const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,

  psqlHost: envVars.PSQL_HOST,
  psqlDatabase: envVars.PSQL_DATABASE,
  psqlUsername: envVars.PSQL_USER,
  psqlPassword: envVars.PSQL_PASSWORD
}
