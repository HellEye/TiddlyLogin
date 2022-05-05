export class ErrorWithCode extends Error {
  statusCode: number
  error: string
  constructor(message, statusCode) {
    super(message)
    this.error=message
    this.statusCode = statusCode
  }
}
export class NotFoundError extends ErrorWithCode {
  constructor(message, type="") {
    super(message, 404)
    this.name = `${type}NotFoundError`
  }
}

export class UnauthenticatedError extends ErrorWithCode {
  constructor(message) {
    super(message, 401)
    this.name = "UnauthenticatedError"
  }
}

export class BadRequestError extends ErrorWithCode {
  constructor(message) {
    super(message, 400)
    this.name = "BadRequestError"
  }
}

export class UnauthorizedError extends ErrorWithCode {
  constructor(message) {
    super(message, 403)
    this.name = "UnauthorizedError"
  }
}

export class ImATeapotError extends ErrorWithCode {
  constructor(message) {
    super(message, 418)
    this.name="ImATeapotError"
  }
}

export class ServiceUnavaliableError extends ErrorWithCode {
  constructor(message) {
    super(message, 503)
    this.name="ServiceUnaviableError"
  }
}



