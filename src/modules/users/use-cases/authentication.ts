import { Injectable } from '@nestjs/common'
import { UserGateway } from '../gateways/user.gateway'
import { GeneralError } from 'src/modules/core/errors/general.error'
import { Either, left, right } from 'src/modules/core/types/either'
import { BadRequestError } from 'src/modules/core/errors/bad-request.error'
import { User } from '../entities/user.entity'

export type AuthenticationInput = {
  email: string
  password: string
}
export type AuthenticationOutput = Either<GeneralError, User>

@Injectable()
export class Authentication {
  constructor(private gateway: UserGateway) {}

  async execute({
    email,
    password,
  }: AuthenticationInput): Promise<AuthenticationOutput> {
    const user = await this.checkCredentials({ email, password })
    if (!user) {
      return left(new BadRequestError('invalid-credentials'))
    }

    return right(user)
  }

  private async checkCredentials({
    email,
    password,
  }: AuthenticationInput): Promise<User | null> {
    const user = await this.gateway.findByEmail(email)
    if (!user) {
      return null
    }

    const isValidPassword = await user.password.equalTo(password)
    if (!isValidPassword) {
      return null
    }

    return user
  }
}
