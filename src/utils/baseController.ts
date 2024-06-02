import { type Request, type Response } from 'express'
import { BaseServicesInterface } from './baseService'
import { type Document } from 'mongoose'
import { Schema } from 'ajv'
import { BaseValidator } from './baseValidators'

export abstract class BaseController<T extends Document> {
  private readonly service: BaseServicesInterface<T>
  private readonly addObjectSchema: Schema
  private readonly updateObjectSchema: Schema

  constructor(service: BaseServicesInterface<T>,addObjectSchema: Schema,
    updateObjectSchema: Schema
  ) {
    this.service=service
    this.addObjectSchema=addObjectSchema
    this.updateObjectSchema=updateObjectSchema
  }

  public async addController(req: Request, res: Response): Promise<Response> {
    try {

      const validator=new BaseValidator(this.addObjectSchema)
      validator.validateInput(req.body)

      await this.service.addService(req.body)
      return res.status(201).json({ message: 'Data added Successfully!!' })
    } catch (e) {
      console.log('Error handler called--->', e)
      return res.status(e.errorCode).json(e.message)
    }
  }

  public async getAllController(req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.service.findAllService(req.query as any)
      return res.status(200).json(data)
    } catch (e) {
      console.log('Error handler called--->', e)
      return res.status(e.errorCode).json(e.message)
    }
  }

  public async getController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const data = await this.service.findOneService(req.query as any)
      return res.status(200).json(data)
    } catch (e) {
      console.log('Error handler called--->', e)
      return res.status(e.errorCode).json(e.message)
    }
  }

  public async getByIdController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      if (typeof req.params.id !== 'string') {
        return res.status(400).json('Id not provided')
      }

      const data = await this.service.findOneService({_id: req.params.id})
      return res.status(200).json(data)
    } catch (e) {
      console.log('Error handler called--->', e)
      return res.status(e.errorCode).json(e.message)
    }
  }

  public async updateController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {

      let data: any=null

      const validator=new BaseValidator(this.updateObjectSchema)
      validator.validateInput(req.body)

      if(typeof req.params.id==='string'){
        data=await this.service.updateOneService({_id: req.params.id},req.body)
      }

      if(Object.keys(req.query).length===0){
        data=await this.service.updateOneService(req.query as any,req.body)
      }
       
      return res.status(200).json(data)
    } catch (e) {
      console.log('Error handler called--->', e)
      return res.status(e.errorCode).json(e.message)
    }
  }

  public async deleteController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      if(typeof req.params.id==='string'){
        await this.service.deleteOneService({_id: req.params.id})
      }

      if(Object.keys(req.query).length===0){
        await this.service.deleteOneService(req.query as any)
      }
       
      return res.status(204).json({ message: 'Deleted Successfully!!' })
    } catch (e) {
      console.log('Error handler called--->', e)
      return res.status(e.errorCode).json(e.message)
    }
  }
}
