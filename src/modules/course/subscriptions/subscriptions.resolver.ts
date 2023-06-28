import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { SubscriptionsService } from './subscriptions.service'
import { EmptyReturn } from 'src/modules/core/http/empty-return'
import { SubscribeInput } from './dto/subscribe.input'
import { CurrentUser } from 'src/auth/current-user.decorator'
import { CurrentUser as CurrentUserType } from 'src/auth/auth.types'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'

@Resolver()
export class SubscriptionsResolver {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Mutation(() => EmptyReturn)
  @UseGuards(AuthGuard)
  async subscribe(
    @Args('data') data: SubscribeInput,
    @CurrentUser() user: CurrentUserType,
  ) {
    await this.subscriptionsService.subscribe(user.sub, data.code)
    return EmptyReturn.build('SUCCESS')
  }
}
