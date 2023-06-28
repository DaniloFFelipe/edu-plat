import { Injectable } from '@nestjs/common'
import { ID } from 'src/modules/core/enities/values-objects/id'
import { Lesson } from '../entities/domain/lesson.model'

@Injectable()
export abstract class LessonGateway {
  abstract create(data: Lesson): Promise<void>
  abstract findManyModuleLessons(moduleId: ID): Promise<Lesson[]>
}
