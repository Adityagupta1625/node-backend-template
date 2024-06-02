import HttpException from './HttpException'
import Ajv, { type Schema } from 'ajv'
import addFormats from 'ajv-formats'

export class BaseValidator {
  private readonly schemaObj: Schema

  constructor(schemaObj: Schema) {
    this.schemaObj = schemaObj
  }

  public validateInput(data: any): void {
    try {
      const ajv = new Ajv()
      addFormats(ajv, { mode: 'full' })
      const validate = ajv.compile(this.schemaObj)
      const valid = validate(data)
      if (valid === false) {
        if (validate.errors === null || validate.errors === undefined) {
          throw new HttpException(400, 'Validation error')
        }

        const errorMessage = validate.errors
          .map((error) => {
            return `${error.message}`
          })
          .join(', ')

        throw new HttpException(400, errorMessage)
      }
    } catch (e: any) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}
