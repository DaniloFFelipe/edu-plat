import { Injectable } from '@nestjs/common'
import { UserGateway } from '../gateways/user.gateway'
import { GeneralError } from 'src/modules/core/errors/general.error'
import { Either, left, right } from 'src/modules/core/types/either'
import { BadRequestError } from 'src/modules/core/errors/bad-request.error'
import { User } from '../entities/user.entity'
import { ID } from 'src/modules/core/enities/values-objects/id'

export type MeInput = {
  userId: string
}
export type MeOutput = Either<GeneralError, User>

@Injectable()
export class Me {
  constructor(private gateway: UserGateway) {}

  async execute({ userId }: MeInput): Promise<MeOutput> {
    const user = await this.gateway.findById(new ID(userId))
    if (!user) return left(new BadRequestError('invalid-user-id'))

    return right(user)
  }
}
