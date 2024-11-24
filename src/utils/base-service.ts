import { type Document, type FilterQuery } from 'mongoose'
import HttpException from './http-exception'
import { ICRUDBase } from './base-crud'

export interface PaginatedResponse<T> {
  data: T[]
  currentPage: number
  totalPages: number
  totalCount?: number
}

export interface IBaseService<T extends Document, C extends ICRUDBase<T>> {
  add: (data: Partial<T>) => Promise<T>
  findAll: (query: FilterQuery<T>) => Promise<T[]>
  findAllPaginated: (
    page: number,
    limit: number,
    query?: FilterQuery<T>
  ) => Promise<PaginatedResponse<T>>
  findOne: (query: FilterQuery<T>) => Promise<T | null>
  update: (query: FilterQuery<T>, data: Partial<T>) => Promise<void>
  delete: (query: FilterQuery<T>) => Promise<void>
}

export abstract class BaseService<T extends Document, C extends ICRUDBase<T>>
  implements IBaseService<T, C>
{
  protected readonly crudBase: C

  constructor(crudBase: C) {
    this.crudBase = crudBase
  }

  async add(data: Partial<T>): Promise<T> {
    try {
      const results = await this.crudBase.create(data)
      return results
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async findAll(query: FilterQuery<T>): Promise<T[]> {
    try {
      return await this.crudBase.findAll(query)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async findOne(query: FilterQuery<T>): Promise<T | null> {
    try {
      const data = await this.crudBase.findOne(query)
      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async update(query: FilterQuery<T>, data: Partial<T>): Promise<void> {
    try {
      await this.crudBase.update(query, data)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async delete(query: FilterQuery<T>): Promise<void> {
    try {
      await this.crudBase.delete(query)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async findAllPaginated(
    page: number,
    limit: number,
    query: FilterQuery<T> = {}
  ): Promise<PaginatedResponse<T>> {
    try {
      const data = await this.crudBase.findAllPaginated(query, page, limit)
      const totalCount = await this.crudBase
        .findAll(query)
        .then((res) => res.length)
      const totalPages = Math.ceil(totalCount / limit)

      return {
        data,
        currentPage: page,
        totalPages,
        totalCount,
      }
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}
