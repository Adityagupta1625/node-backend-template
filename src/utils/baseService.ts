import HttpException from './HttpException'
import { CRUDBaseInterface } from './baseCrud'
import { Document, FilterQuery } from 'mongoose'

export interface BaseServicesInterface<T extends Document> {
    addService(data: Partial<T>): Promise<T>;
    addManyService(data: Partial<T>[]): Promise<T[]>;
    findAllService(query: FilterQuery<T>): Promise<T[]>;
    findOneService(query: FilterQuery<T>): Promise<T | null>;
    updateOneService(query: FilterQuery<T>, data: Partial<T>): Promise<T>;
    updateAllService(query: FilterQuery<T>, data: Partial<T>): Promise<void>;
    deleteOneService(query: FilterQuery<T>): Promise<void>;
    deleteAllService(query: FilterQuery<T>): Promise<void>;
  }

export abstract class BaseServices<T extends Document> implements BaseServicesInterface<T>{
  private readonly crud: CRUDBaseInterface<T>

  constructor(CRUDService: CRUDBaseInterface<T>) {
    this.crud = CRUDService
  }

  public async addService(data: Partial<T>): Promise<T> {
    try {
      const result = await this.crud.add(data)
      return result
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async addManyService(data: Partial<T>[]): Promise<T[]> {
    try {
      const result = await this.crud.addMany(data)
      return result
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async findAllService(query: FilterQuery<T>): Promise<T[]> {
    try {
      const result = await this.crud.findAll(query)
      return result
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async findOneService(query: FilterQuery<T>): Promise<T | null> {
    try {
      const result = await this.crud.findOne(query)
      return result
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async updateOneService(
    query: FilterQuery<T>,
    data: Partial<T>
  ): Promise<T> {
    try {
      const result = await this.crud.updateOne(query, data)
      return result
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async updateAllService(
    query: FilterQuery<T>,
    data: Partial<T>
  ): Promise<void> {
    try {
      await this.crud.updateAll(query, data)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async deleteOneService(query: FilterQuery<T>): Promise<void> {
    try {
      await this.crud.deleteOne(query)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  public async deleteAllService(query: FilterQuery<T>): Promise<void> {
    try {
      await this.crud.deleteAll(query)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}
