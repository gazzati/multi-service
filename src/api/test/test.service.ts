import type { TestItem, TestList, CreateTest, UpdateTest } from "./test.schema"

interface ListFilters {
  from: number
}

class TestService {
  public async get(id: number): Promise<TestItem | null> {
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (id > 10) return null

    return {
      id,
      name: `Test ${id}`,
      email: `test${id}@mail.ru`
    }
  }

  public async getList(filters: ListFilters): Promise<TestList> {
    await new Promise(resolve => setTimeout(resolve, 1000))

    return new Array(10).fill(Number).map((_, index) => {
      const id = index + filters.from

      return {
        id,
        name: `Test ${id}`,
        email: `test${id}@mail.ru`
      }
    })
  }

  public async create(payload: CreateTest): Promise<TestItem | null> {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const id = Math.floor(Math.random() * 100)
    if (id > 70) return null

    return { id, ...payload }
  }

  public async update(id: number, payload: UpdateTest): Promise<TestItem | null> {
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (id > 10) return null

    const res = {
      id,
      name: `Test ${id}`,
      email: `test${id}@mail.ru`
    }

    return { ...res, ...payload }
  }

  public async delete(id: number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000))

    return id <= 10
  }
}

export default TestService
