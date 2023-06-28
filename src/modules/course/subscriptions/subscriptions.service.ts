import { Injectable } from '@nestjs/common'
import { Subscribe } from './usecases/subscribe'
import { HttpException } from 'src/modules/core/exceptions/http-exceptions'

@Injectable()
export class SubscriptionsService {
  constructor(private subscribeUS: Subscribe) {}

  async subscribe(userId: string, code: string) {
    const result = await this.subscribeUS.execute({ code, userId })
    if (result.isLeft()) {
      throw HttpException.build(result.value)
    }
  }
}
