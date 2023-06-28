import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { CreateUserInput } from './dto/create-user.input'
import { HttpUser } from './entities/http/user.model'
import { Session } from './entities/http/session.model'
import { AuthUserInput } from './dto/auth-user.input'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'
import { CurrentUser } from 'src/auth/current-user.decorator'
import { Public } from 'src/auth/public'

@Resolver(() => HttpUser)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Mutation(() => Session, { name: 'register' })
  createUser(@Args('data') input: CreateUserInput) {
    return this.usersService.register(input)
  }

  @Public()
  @Mutation(() => Session, { name: 'signIn' })
  signIn(@Args('data') input: AuthUserInput) {
    return this.usersService.authentication(input)
  }

  @UseGuards(AuthGuard)
  @Query(() => HttpUser, { name: 'me' })
  me(@CurrentUser() auth: { sub: string }) {
    return this.usersService.me({ userId: auth.sub })
  }
}
