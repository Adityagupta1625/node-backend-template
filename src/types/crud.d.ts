import { type Document, type Model } from 'mongoose'

// Define a set of base CRUD methods for Mongoose models
interface BaseCRUDMethods<T extends Document> {
  /**
   * Adds new data to the database.
   * @param data - The data to be added.
   * @returns A promise that resolves when the data is successfully added.
   */
  addData: (data: any) => Promise<any>

  /**
   * Finds a document by its ID.
   * @param id - The ID of the document to find.
   * @returns A promise that resolves to the found document or null if not found.
   */
  findbyId: (id: string) => Promise<T | null>

  /**
   * Finds all documents in the collection.
   * @returns A promise that resolves to an array of all documents.
   */
  findAll: () => Promise<T[]>

  /**
   * Updates a document by its ID.
   * @param id - The ID of the document to update.
   * @param data - The data to update the document with.
   * @returns A promise that resolves to the updated document or null if not found.
   */
  update: (id: string, data: any) => Promise<T | null>

  /**
   * Deletes a document by its ID.
   * @param id - The ID of the document to delete.
   * @returns A promise that resolves when the document is successfully deleted.
   */
  delete: (id: string) => Promise<void>

  /**
   * Finds documents by a specified field.
   * @param field - The field to search for.
   * @returns A promise that resolves to an array of documents matching the field.
   */
  findbyField: (key: string, value: string) => Promise<T[]>

  /**
   * Finds the first document by a specified field.
   * @param field - The field to search for.
   * @returns A promise that resolves to the first document matching the field or null if not found.
   */
  findOnebyField: (key: string, value: string) => Promise<T | null>
}

// Define a base type for CRUD operations on Mongoose models
type CRUDBaseType<T extends Document> = new (baseModel: Model<T>) => {
  baseModel: Model<T>
} & BaseCRUDMethods<T>

// Define a type for an instance of the CRUD base type
type CRUDBaseInstance<T extends Document> = InstanceType<CRUDBaseType<T>>

// Export the CRUDBaseInstance type for use in other modules
export default CRUDBaseInstance
