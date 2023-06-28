import { BaseEntity } from 'src/modules/core/enities/base-entity'
import { ID } from 'src/modules/core/enities/values-objects/id'

interface SubscriptionProps {
  userId: ID
  courseId: ID
  createdAt: Date
}

interface CreateSubscriptionProps {
  userId: string
  courseId: string
  createdAt?: Date
}

export class Subscription extends BaseEntity<SubscriptionProps> {
  get userId() {
    return this._props.userId
  }

  get courseId() {
    return this._props.courseId
  }

  get createdAt() {
    return this._props.createdAt
  }

  static build(props: CreateSubscriptionProps, id?: string) {
    return new Subscription(
      {
        userId: new ID(props.userId),
        courseId: new ID(props.courseId),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
