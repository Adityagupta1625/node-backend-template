import { type Request, type Response } from 'express'
import type CRUDBaseType from '../types/crud'
import { type Document } from 'mongoose'
import type HttpExceptionInterface from '../types/http-exception'

/**
 * Base controller class for handling CRUD operations.
 */
export abstract class BaseController {
  /**
   * The CRUD service to perform operations on the data model.
   */
  public crudService: CRUDBaseType<Document>

  /**
   * Creates an instance of the BaseController.
   * @param crudService - The CRUD service to be used by the controller.
   */
  constructor (crudService: CRUDBaseType<Document>) {
    this.crudService = crudService
  }

  /**
   * Handles the addition of data to the database.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns A promise resolving to the response object.
   */
  public async addController (req: Request, res: Response): Promise<Response> {
    try {
      await this.crudService.addData(req.body)
      return res.status(201).json({ message: 'Data added successfully!!' })
    } catch (e: unknown) {
      const err = e as HttpExceptionInterface
      return res
        .status(err?.errorCode ?? 500)
        .json({ message: err?.message ?? 'Internal Server Error' })
    }
  }

  /**
   * Handles the retrieval of all data from the database.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns A promise resolving to the response object.
   */
  public async getAllController (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const doc = await this.crudService.findAll()
      return res.status(200).json(doc)
    } catch (e: unknown) {
      const err = e as HttpExceptionInterface
      return res
        .status(err?.errorCode ?? 500)
        .json({ message: err?.message ?? 'Internal Server Error' })
    }
  }

  /**
   * Handles the retrieval of a specific data by ID from the database.
   * @param req - Express request object with parameters.
   * @param res - Express response object.
   * @returns A promise resolving to the response object.
   */
  public async getByIdController (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      if (req.params?.id === undefined || req.params?.id === null) {
        return res.status(400).json({
          message: 'Invalid id provided'
        })
      }

      const doc = await this.crudService.findbyId(req.params.id)
      return res.status(200).json(doc)
    } catch (e: unknown) {
      const err = e as HttpExceptionInterface
      return res
        .status(err?.errorCode ?? 500)
        .json({ message: err?.message ?? 'Internal Server Error' })
    }
  }

  /**
   * Handles the update of data in the database.
   * @param req - Express request object with parameters and body.
   * @param res - Express response object.
   * @returns A promise resolving to the response object.
   */
  public async updateController (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      if (req.params?.id === undefined || req.params?.id === null) {
        return res.status(400).json({
          message: 'Invalid id provided'
        })
      }

      const doc = await this.crudService.update(req.params.id, req.body)
      return res.status(200).json(doc)
    } catch (e: unknown) {
      const err = e as HttpExceptionInterface
      return res
        .status(err?.errorCode ?? 500)
        .json({ message: err?.message ?? 'Internal Server Error' })
    }
  }

  /**
   * Handles the update of data in the database.
   * @param req - Express request object with parameters and body.
   * @param res - Express response object.
   * @returns A promise resolving to the response object.
   */
  public async deleteController (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      if (req.params?.id === undefined || req.params?.id === null) {
        return res.status(400).json({
          message: 'Invalid id provided'
        })
      }

      await this.crudService.delete(req.params.id)
      return res.status(200).json({ message: 'Data Deleted Succesfully!!' })
    } catch (e: unknown) {
      const err = e as HttpExceptionInterface

      return res
        .status(err?.errorCode ?? 500)
        .json({ message: err?.message ?? 'Internal Server Error' })
    }
  }
}
