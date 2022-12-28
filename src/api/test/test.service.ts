import BaseService from "@api/base.service"
import { Like } from "typeorm"

import type { TestItem, TestList, CreateTest, UpdateTest } from "./test.schema"

interface ListFilters {
  title: string
}

class TestService extends BaseService {
  public async get(id: number): Promise<TestItem | null> {
    const test = await this.entities.Test.findOne({ where: { id } })
    if (!test) return null

    return test
  }

  public async getList(filters: ListFilters): Promise<TestList> {
    const { title } = filters
    const tests = await this.entities.Test.find({
      where: {
        ...(title && { title: Like(`%${title}%`) })
      }
    })

    return tests
  }

  public async create(payload: CreateTest): Promise<boolean> {
    const response = await this.entities.Test.insert(payload)
    return !!response
  }

  public async update(id: number, payload: UpdateTest): Promise<boolean> {
    const response = await this.entities.Test.update(id, payload)
    return !!response.affected
  }

  public async delete(id: number): Promise<boolean> {
    const response = await this.entities.Test.delete(id)
    return !!response.affected
  }
}

export default TestService
