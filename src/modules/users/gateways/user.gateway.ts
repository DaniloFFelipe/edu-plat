import { ID } from 'src/modules/core/enities/values-objects/id'
import { User } from '../entities/user.entity'
import { Injectable } from '@nestjs/common'

export type FindByUsernameAndCodeParams = {
  code: string
  username: string
}

@Injectable()
export abstract class UserGateway {
  abstract findById(id: ID): Promise<User | null>

  abstract findByEmail(email: string): Promise<User | null>

  abstract findByUsernameAndCode(
    params: FindByUsernameAndCodeParams,
  ): Promise<User | null>

  abstract create(user: User): Promise<void>

  // abstract save(user: User): Promise<void>

  // abstract delete(user: User): Promise<void>
}
