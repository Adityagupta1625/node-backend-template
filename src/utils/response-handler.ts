import { type Response, type Request } from 'express'
import { Enum } from '../constants'

export const responseHandler = (
  statusCode: number,
  res: Response,
  message: string,
  data: any,
  req: Request
): Response => {
  return res.status(statusCode).json({
    message,
    status: Enum.RESPONSE_STATES.SUCCESS,
    data,
  })
}
