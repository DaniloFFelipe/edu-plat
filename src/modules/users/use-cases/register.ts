import { Injectable } from '@nestjs/common'

import { UserGateway } from '../gateways/user.gateway'
import { Either, left, right } from 'src/modules/core/types/either'
import { NotFoundError } from 'src/modules/core/errors/not-found.error'
import { User } from '../entities/user.entity'
import { GeneralError } from 'src/modules/core/errors/general.error'

export type RegisterInput = {
  name: string
  code: string
  username: string
  email: string
  password: string
  picture: string
}

export type RegisterOutput = Either<GeneralError, User>

@Injectable()
export class Register {
  constructor(private gateway: UserGateway) {}

  async execute(input: RegisterInput): Promise<RegisterOutput> {
    const [emailExists, usernameCodeExists] = await Promise.all([
      this.gateway.findByEmail(input.email),
      this.gateway.findByUsernameAndCode({
        code: input.code,
        username: input.username,
      }),
    ])

    if (emailExists) {
      return left(new NotFoundError('email-exists'))
    }

    if (usernameCodeExists) {
      return left(new NotFoundError('username-with-code-exists'))
    }

    const user = User.build({
      name: input.name,
      code: input.code,
      username: input.username,
      email: input.email,
      picture: input.picture,
      password: input.password,
    })

    await this.gateway.create(user)

    return right(user)
  }
}
