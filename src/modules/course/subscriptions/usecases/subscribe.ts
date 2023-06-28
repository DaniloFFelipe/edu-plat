import { Injectable } from '@nestjs/common'
import { GeneralError } from 'src/modules/core/errors/general.error'
import { Either, left, right } from 'src/modules/core/types/either'
import { Code } from 'src/modules/core/enities/values-objects/code'
import { BadRequestError } from 'src/modules/core/errors/bad-request.error'
import { ID } from 'src/modules/core/enities/values-objects/id'
import { CourseGateway } from '../../gateways/course.gateway'
import { SubscriptionGateway } from '../gateways/subscription.gateway'
import { Subscription } from '../entities/domain/subscription.model'

export type SubscribeInput = {
  code: string
  userId: string
}
export type SubscribeOutput = Either<GeneralError, null>

@Injectable()
export class Subscribe {
  constructor(
    private gateway: CourseGateway,
    private subsGateway: SubscriptionGateway,
  ) {}

  async execute({ code, userId }: SubscribeInput): Promise<SubscribeOutput> {
    const course = await this.gateway.findByCode(Code.build(code))
    if (!course) return left(new BadRequestError('course-not-found'))
    const hasSubscription = await this.subsGateway.findUserCourseSubscription(
      new ID(userId),
      course.id,
    )
    if (hasSubscription) return left(new BadRequestError('subscription-exists'))

    const subscription = Subscription.build({
      courseId: course.id.value,
      userId,
    })

    await this.subsGateway.create(subscription)
    return right(null)
  }
}
