import { Request, Response, NextFunction } from "express"
import { ErrorWithCode } from '../types/Errors';

const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorWithCode) {
    res.status(err.statusCode).send(err.message)
  }
  else {
    next(err)
  }
}

const asyncHandler = (fn:Function)=> (req: Request, res: Response, next: NextFunction) => {
  return Promise
    .resolve(fn(req, res, next))
    .catch(next)
}

export { errorHandlerMiddleware, asyncHandler }
