import { ID } from 'src/modules/core/enities/values-objects/id'
import { Subscription } from '../entities/domain/subscription.model'
import { SubscriptionGateway } from './subscription.gateway'
import { Injectable } from '@nestjs/common'
import { DatabaseGateway } from 'src/modules/core/gateways/database.gateway'

@Injectable()
export class DatabaseSubscriptionGateway
  extends DatabaseGateway
  implements SubscriptionGateway
{
  async findUserCourseSubscription(
    userId: ID,
    courseId: ID,
  ): Promise<Subscription | null> {
    const subs = await this.db.subcription.findUnique({
      where: {
        userId_courseId: {
          courseId: courseId.value,
          userId: userId.value,
        },
      },
    })

    if (!subs) return null

    return Subscription.build(
      {
        courseId: subs.courseId,
        userId: subs.userId,
        createdAt: subs.createdAt,
      },
      subs.id,
    )
  }

  async create(data: Subscription): Promise<void> {
    await this.db.subcription.create({
      data: {
        courseId: data.courseId.value,
        userId: data.userId.value,
        id: data.id.value,
        createdAt: data.createdAt,
      },
    })
  }
}
