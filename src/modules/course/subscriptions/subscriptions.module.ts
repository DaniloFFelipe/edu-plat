import { Module } from '@nestjs/common'
import { SubscriptionsService } from './subscriptions.service'
import { SubscriptionsResolver } from './subscriptions.resolver'
import { DatabaseSubscriptionGateway } from './gateways/database-subscription.gateway'
import { SubscriptionGateway } from './gateways/subscription.gateway'
import { DatabaseModule } from 'src/database/database.module'
import { AuthModule } from 'src/auth/auth.module'
import { Subscribe } from './usecases/subscribe'
import { CourseGateway } from '../gateways/course.gateway'
import { DatabaseCourseGateway } from '../gateways/database-course.gateway'
import { DatabaseMapper } from '../mappers/database.mapper'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from 'src/auth/auth.guard'

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [
    SubscriptionsResolver,
    SubscriptionsService,
    Subscribe,
    DatabaseMapper,
    {
      useClass: DatabaseSubscriptionGateway,
      provide: SubscriptionGateway,
    },
    {
      useClass: DatabaseCourseGateway,
      provide: CourseGateway,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class SubscriptionsModule {}
