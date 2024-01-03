import { type Request, type Response, type NextFunction } from 'express'
import { validateOrReject } from 'class-validator'
import { plainToInstance } from 'class-transformer'

/**
 * InputValidation class for validating incoming request data using class-validator.
 */
export abstract class InputValidation {
  /**
   * The validation object or class instance with class-validator decorators.
   */
  validatorObj: any

  /**
   * Creates an instance of the InputValidation class.
   * @param validatorObj - The validation object or class instance with class-validator decorators.
   */
  constructor (validatorObj: any) {
    this.validatorObj = validatorObj
  }

  /**
   * Middleware function to validate incoming request data.
   * @param req - Express request object.
   * @param res - Express response object.
   * @param next - Express next function to pass control to the next middleware.
   * @returns A promise resolving to the response or an error object.
   */
  public async validateInput (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | any> {
    try {
      // Convert request body to an instance of the validation class
      const dtoInstance = plainToInstance(this.validatorObj, req.body)

      // Validate the instance using class-validator
      await validateOrReject(dtoInstance)

      // Move to the next middleware if validation passes
      next()
    } catch (e: any) {
      // Log the validation error and return a 400 Bad Request response
      return res.send(400).json({ message: 'Invalid Data' })
    }
  }
}
