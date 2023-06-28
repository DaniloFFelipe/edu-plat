import { ID } from 'src/modules/core/enities/values-objects/id'
import { LessonGateway } from '../gateways/lesson.gateway'
import { Injectable } from '@nestjs/common'

type Input = {
  moduleId: string
}

@Injectable()
export class FindModuleLessons {
  constructor(private lessonsGateway: LessonGateway) {}

  async execute({ moduleId }: Input) {
    const lessons = await this.lessonsGateway.findManyModuleLessons(
      new ID(moduleId),
    )

    return lessons
  }
}
