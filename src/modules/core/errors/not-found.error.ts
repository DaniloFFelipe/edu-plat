import { GeneralError } from './general.error'

export class NotFoundError extends GeneralError {
  constructor(message: string) {
    super(404, message)
  }
}
