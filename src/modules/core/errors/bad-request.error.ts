import { GeneralError } from './general.error'

export class BadRequestError extends GeneralError {
  constructor(message: string) {
    super(400, message)
  }
}
