import { Response } from "express"

export const errorHandler=async (e: any,res: Response): Promise<Response>=>{
    console.log('Error handler called--->',e)
    return res.status(e.errorCode).json(e.message)
}