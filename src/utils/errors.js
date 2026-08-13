export class NotFoundError extends Error {
  constructor(mensaje) {
    super(mensaje);

    this.name = "NotFoundError";
    this.statusCode = 404;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends Error {
  constructor(mensaje) {
    super(mensaje);

    this.name = "ValidationError";
    this.statusCode = 400;

    Error.captureStackTrace(this, this.constructor);
  }
}
