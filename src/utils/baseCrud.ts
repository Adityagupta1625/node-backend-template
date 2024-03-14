import { type Document, type Model } from 'mongoose'
import HttpException from './HttpException'

export interface CRUDBaseInterface<T extends Document> {
  add: (data: Partial<T>) => Promise<T>
  getAll: (query: any) => Promise<T[]>
  get: (query: any) => Promise<T | null>
  update: (id: string, data: Partial<T>) => Promise<T>
  delete: (id: string) => Promise<void>
}

export abstract class CRUDBase<T extends Document>
  implements CRUDBaseInterface<T>
{
  private readonly baseModel: Model<T>

  constructor(baseModel: Model<T>) {
    this.baseModel = baseModel
  }

  public async add(data: Partial<T>): Promise<T> {
    try {
      const resp = await this.baseModel.create(data)
      return resp
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async getAll(query: any): Promise<T[]> {
    try {
      const resp = await this.baseModel.find(query)
      return resp
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async get(query: any): Promise<T | null> {
    try {
      const data = await this.baseModel.findOne(query)
      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async update(id: string, data: Partial<T>): Promise<T> {
    try {
      if (typeof id !== 'string') {
        throw new HttpException(400, 'Missing parameter')
      }

      const result = await this.baseModel.findByIdAndUpdate(id, data, {
        new: true,
      })

      if (result === null) throw new HttpException(404, 'Resource Not Found!!')

      return result
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      if (typeof id !== 'string') {
        throw new HttpException(400, 'Missing parameter')
      }

      await this.baseModel.findByIdAndDelete(id)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}
