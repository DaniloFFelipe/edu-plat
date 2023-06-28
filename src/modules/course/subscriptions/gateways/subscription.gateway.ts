import { ID } from 'src/modules/core/enities/values-objects/id'
import { Subscription } from '../entities/domain/subscription.model'

export abstract class SubscriptionGateway {
  abstract findUserCourseSubscription(
    userId: ID,
    courseId: ID,
  ): Promise<Subscription | null>

  abstract create(data: Subscription): Promise<void>
}
