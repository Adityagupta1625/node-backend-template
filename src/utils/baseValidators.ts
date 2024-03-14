import { plainToInstance } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { type NextFunction, type Request, type Response } from 'express'

export abstract class BaseValidator {
  private readonly inputObject: any;

  constructor(inputObject: any) {
    this.inputObject=inputObject
  }

  
  public async validateInput(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | any> {
    try {
      const dtoInstance = plainToInstance(this.inputObject, req.body)

      await validateOrReject(dtoInstance)

      next()
    } catch (e: any) {
      return res.status(400).json({ message: e })
    }
  }
}