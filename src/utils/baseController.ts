import { type Request, type Response } from 'express'
import { type CRUDBaseInterface } from './baseCrud'
import { type Document } from 'mongoose'
import { errorHandler } from './errorHandler'

export abstract class BaseController<T extends Document> {
  private readonly CRUDService: CRUDBaseInterface<T>

  constructor(CRUDService: CRUDBaseInterface<T>) {
    this.CRUDService = CRUDService
  }

  public async addController(req: Request, res: Response): Promise<Response> {
    try {
      await this.CRUDService.add(req.body)
      return res.status(201).json({ message: 'Data added Successfully!!' })
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async getController(req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.CRUDService.getAll(req.query)
      return res.status(200).json(data)
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async getOneController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const data = await this.CRUDService.get(req.query)
      return res.status(200).json(data)
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async getByIdController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      if (typeof req.body.params !== 'string') {
        return res.status(400).json('Id not provided')
      }

      const data = await this.CRUDService.get({
        id: req.params.id,
      })
      return res.status(200).json(data)
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async updateController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const data = await this.CRUDService.update(req.params.id, req.body)
      return res.status(200).json(data)
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async deleteController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      await this.CRUDService.delete(req.params.id)
      return res.status(204).json({ message: 'Deleted Successfully!!' })
    } catch (e) {
      return await errorHandler(e, res)
    }
  }
}
