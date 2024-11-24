import { type Request, type Response } from 'express'
import { type IBaseService } from './base-service'
import { type FilterQuery, type Document } from 'mongoose'
import { errorHandler } from './error-handler'
import { Enum } from '../constants'
import { responseHandler } from './response-handler'
import { type ICRUDBase } from './base-crud'

export interface IBaseController<
  T extends Document,
  C extends ICRUDBase<T>,
  S extends IBaseService<T, C>,
> {
  addController: (req: Request, res: Response) => Promise<Response>
  getAllController: (req: Request, res: Response) => Promise<Response>
  getByIdController: (req: Request, res: Response) => Promise<Response>
  updateController: (req: Request, res: Response) => Promise<Response>
  deleteController: (req: Request, res: Response) => Promise<Response>
}

export abstract class BaseController<
  T extends Document,
  C extends ICRUDBase<T>,
  S extends IBaseService<T, C>,
> implements IBaseController<T, C, S>
{
  protected readonly service: S

  constructor(service: S) {
    this.service = service
  }

  async addController(req: Request, res: Response): Promise<Response> {
    try {
      const createdDoc = await this.service.add(req.body as Partial<T>)
      return responseHandler(
        Enum.RESPONSE_CODES.CREATED,
        res,
        'Document created successfully',
        createdDoc,
        req
      )
    } catch (e) {
      return errorHandler(e, res, req)
    }
  }

  async getAllController(req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.service.findAll(req.query as FilterQuery<T>)
      return responseHandler(
        Enum.RESPONSE_CODES.OK,
        res,
        'Documents fetched successfully',
        data,
        req
      )
    } catch (e) {
      return errorHandler(e, res, req)
    }
  }

  async getByIdController(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params?.id
      if (!id) {
        return res.status(400).json('Id not provided')
      }
      const query: FilterQuery<T> = { _id: id } as any
      const data = await this.service.findOne(query)
      return responseHandler(
        Enum.RESPONSE_CODES.OK,
        res,
        'Document fetched successfully',
        data,
        req
      )
    } catch (e) {
      return errorHandler(e, res, req)
    }
  }

  async updateController(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params?.id
      if (!id) {
        return res.status(400).json('Id not provided')
      }
      const query: FilterQuery<T> = { _id: id } as any
      await this.service.update(query, req.body as Partial<T>)
      return responseHandler(
        Enum.RESPONSE_CODES.OK,
        res,
        'Document updated successfully',
        null,
        req
      )
    } catch (e) {
      return errorHandler(e, res, req)
    }
  }

  async deleteController(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params?.id
      if (!id) {
        return res.status(400).json('Id not provided')
      }
      const query: FilterQuery<T> = { _id: id } as any
      await this.service.delete(query)
      return responseHandler(
        Enum.RESPONSE_CODES.OK,
        res,
        'Document deleted successfully',
        null,
        req
      )
    } catch (e) {
      return errorHandler(e, res, req)
    }
  }
}
