import { Injectable } from '@nestjs/common'
import { Lesson } from '../entities/domain/lesson.model'
import { LessonGateway } from '../gateways/lesson.gateway'
import { ID } from 'src/modules/core/enities/values-objects/id'

export type CreateLessonInput = {
  title: string
  duration: string
  notes: string
  contentUrl: string
  moduleId: string
}

@Injectable()
export class CreateLesson {
  constructor(private lessonsGateway: LessonGateway) {}

  async execute({
    contentUrl,
    duration,
    moduleId,
    notes,
    title,
  }: CreateLessonInput) {
    const lesson = Lesson.build({
      contentUrl,
      duration,
      moduleId: new ID(moduleId),
      notes,
      title,
    })
    await this.lessonsGateway.create(lesson)

    return lesson
  }
}
