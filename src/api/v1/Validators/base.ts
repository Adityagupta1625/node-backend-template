import { type Request, type Response, type NextFunction } from 'express'
import { validateOrReject } from 'class-validator'
import { plainToInstance } from 'class-transformer'

export class InputValiation {
  validatorObj: any

  constructor (validatorObj: any) {
    this.validatorObj = validatorObj
  }

  public async validateInput (req: Request, res: Response, next: NextFunction): Promise<Response | any> {
    try {
      const dtoInstance = plainToInstance(this.validatorObj, req.body)

      await validateOrReject(dtoInstance)
      next()
    } catch (e: any) {
      console.log('Caught promise rejection (validation failed). Errors: ', e)

      return res.status(400).send(e);
    }
  }
}