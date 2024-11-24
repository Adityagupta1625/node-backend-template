import { type Document, type Model, type FilterQuery } from 'mongoose'
import HttpException from './http-exception'

export interface ICRUDBase<T extends Document> {
  create: (data: Partial<T>) => Promise<T>
  findAll: (query: FilterQuery<T>) => Promise<T[]>
  findOne: (query: FilterQuery<T>) => Promise<T | null>
  findAllPaginated: (
    query: FilterQuery<T>,
    page: number,
    limit: number
  ) => Promise<T[]>
  update: (query: FilterQuery<T>, data: Partial<T>) => Promise<void>
  delete: (query: FilterQuery<T>) => Promise<void>
}

export abstract class CRUDBase<T extends Document> implements ICRUDBase<T> {
  private readonly baseModel: Model<T>

  constructor(baseModel: Model<T>) {
    this.baseModel = baseModel
  }

  public async create(data: Partial<T>): Promise<T> {
    try {
      const resp = await this.baseModel.create(data)
      return resp
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async findAll(query: FilterQuery<T>): Promise<T[]> {
    try {
      const resp = await this.baseModel.find(query)
      return resp
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async findOne(query: FilterQuery<T>): Promise<T | null> {
    try {
      const data = await this.baseModel.findOne(query)
      if (data === null) throw new HttpException(400, 'Data Not Found!!')
      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async update(query: FilterQuery<T>, data: Partial<T>): Promise<void> {
    try {
      await this.baseModel.updateMany(query, data)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async delete(query: FilterQuery<T>): Promise<void> {
    try {
      await this.baseModel.deleteMany(query)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async findAllPaginated(
    query: FilterQuery<T>,
    page: number,
    limit: number
  ): Promise<T[]> {
    try {
      const resp = await this.baseModel
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit)
      return resp
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}
