import { type Document, type Model } from 'mongoose'
import HttpException from './http-exception'

/**
 * Generic CRUD base class for Mongoose models.
 */
export abstract class CRUDBase<T extends Document> {
  /**
   * The Mongoose model associated with the CRUD operations.
   */
  public baseModel: Model<T>

  /**
   * Creates an instance of the CRUDBase class.
   * @param baseModel - The Mongoose model to perform CRUD operations on.
   */
  constructor (baseModel: Model<T>) {
    this.baseModel = baseModel
  }

  /**
   * Adds data to the database.
   * @param data - The data to be added.
   * @returns A promise that resolves when the data is successfully added.
   * @throws HttpException if an error occurs during the operation.
   */
  public async addData (data: any): Promise<void> {
    try {
      await this.baseModel.create(data)
    } catch (e) {
      throw new HttpException(500, e)
    }
  }

  /**
   * Finds a document by its ID.
   * @param id - The ID of the document to find.
   * @returns A promise that resolves to the found document or null if not found.
   * @throws HttpException if an error occurs during the operation.
   */
  public async findbyId (id: string): Promise<T | null> {
    try {
      if (id === null || id === undefined) {
        throw new HttpException(400, 'Invalid ID')
      }

      return await this.baseModel.findById(id)
    } catch (e) {
      throw new HttpException(500, e)
    }
  }

  /**
   * Finds all documents in the collection.
   * @returns A promise that resolves to an array of all documents.
   * @throws HttpException if an error occurs during the operation.
   */
  public async findAll (): Promise<T[]> {
    try {
      return await this.baseModel.find({})
    } catch (e) {
      throw new HttpException(500, e)
    }
  }

  /**
   * Updates a document by its ID.
   * @param id - The ID of the document to update.
   * @param data - The data to update the document with.
   * @returns A promise that resolves to the updated document or null if not found.
   * @throws HttpException if an error occurs during the operation.
   */
  public async update (id: string, data: any): Promise<T | null> {
    try {
      if (id === null || id === undefined) {
        throw new HttpException(400, 'Invalid ID')
      }

      const doc = await this.baseModel.findByIdAndUpdate(id, data, {
        new: true
      })

      return doc
    } catch (e) {
      throw new HttpException(500, e)
    }
  }

  /**
   * Deletes a document by its ID.
   * @param id - The ID of the document to delete.
   * @returns A promise that resolves when the document is successfully deleted.
   * @throws HttpException if an error occurs during the operation.
   */
  public async delete (id: string): Promise<void> {
    try {
      if (id === null || id === undefined) {
        throw new HttpException(400, 'Invalid ID')
      }

      await this.baseModel.findByIdAndDelete(id)
    } catch (e) {
      throw new HttpException(500, e)
    }
  }

  /**
   * Finds documents by a specified field.
   * @param field - The field to search for.
   * @returns A promise that resolves to an array of documents matching the field.
   * @throws HttpException if an error occurs during the operation.
   */
  public async findbyField (key: string, value: string): Promise<any> {
    try {
      if (key === null || key === undefined) {
        throw new HttpException(400, 'Invalid data')
      }

      if (value === null || value === undefined) {
        throw new HttpException(400, 'Invalid data')
      }

      const query: any = {}
      query[key] = value
      return await this.baseModel.find(query)
    } catch (e) {
      throw new HttpException(500, e)
    }
  }

  /**
   * Finds the first document by a specified field.
   * @param field - The field to search for.
   * @returns A promise that resolves to the first document matching the field or null if not found.
   * @throws HttpException if an error occurs during the operation.
   */
  public async findOnebyField (key: string, value: string): Promise<T | null> {
    try {
      if (key === null || key === undefined) {
        throw new HttpException(400, 'Invalid data')
      }

      if (value === null || value === undefined) {
        throw new HttpException(400, 'Invalid data')
      }

      const query: any = {}
      query[key] = value

      return await this.baseModel.findOne(query)
    } catch (e) {
      throw new HttpException(500, e)
    }
  }
}
