/* eslint-disable no-console */
import { DataSource } from "typeorm"

import { Test } from "@root/database/entities/Test"

import config from "@config/index"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.psqlHost,
  port: 5432,
  database: config.psqlDatabase,
  username: config.psqlUsername,
  password: config.psqlPassword,
  entities: [Test],
  subscribers: [],
  migrations: [],
  synchronize: true
  //logging: true
})

AppDataSource.initialize()
  .then(() => {
    console.log(`Connected to the database: ${config.psqlDatabase}`)
  })
  .catch(error => console.error(error))

export const entities = {
  Test: AppDataSource.getRepository(Test)
}
