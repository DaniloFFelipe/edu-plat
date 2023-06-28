import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { Authentication } from './use-cases/authentication'
import { Register } from './use-cases/register'
import { AuthService } from 'src/auth/auth.service'
import { Session } from './entities/http/session.model'
import { AuthUserInput } from './dto/auth-user.input'
import { HttpException } from '../core/exceptions/http-exceptions'
import { Me } from './use-cases/me'
import { HttpUser } from './entities/http/user.model'

@Injectable()
export class UsersService {
  constructor(
    private authUseCase: Authentication,
    private registerUseCase: Register,
    private meUseCase: Me,
    private authService: AuthService,
  ) {}

  async register(input: CreateUserInput) {
    const result = await this.registerUseCase.execute(input)
    if (result.isLeft()) {
      throw HttpException.build(result.value)
    }

    const token = await this.authService.signToken(result.value.id.value)
    return Session.build(token)
  }

  async authentication(input: AuthUserInput) {
    const result = await this.authUseCase.execute(input)
    if (result.isLeft()) {
      throw HttpException.build(result.value)
    }

    const token = await this.authService.signToken(result.value.id.value)
    return Session.build(token)
  }

  async me(input: { userId: string }) {
    const result = await this.meUseCase.execute(input)
    if (result.isLeft()) {
      throw HttpException.build(result.value)
    }

    return HttpUser.fromEntity(result.value)
  }
}
