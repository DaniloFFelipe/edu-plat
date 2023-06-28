import { HttpException as NestHttpException } from '@nestjs/common'
import { GeneralError } from '../errors/general.error'

export const HttpException = {
  build(error: GeneralError) {
    return new NestHttpException(error.message, error.code)
  },
}
