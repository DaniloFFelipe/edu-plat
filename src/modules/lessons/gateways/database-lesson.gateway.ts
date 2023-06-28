import { LessonGateway } from './lesson.gateway'
import { Injectable } from '@nestjs/common'
import { ID } from 'src/modules/core/enities/values-objects/id'
import { DatabaseGateway } from 'src/modules/core/gateways/database.gateway'
import { DatabaseLessonMapper } from '../mappers/database-lesson.mapper'
import { Lesson } from '../entities/domain/lesson.model'

@Injectable()
export class DatabaseLessonGateway
  extends DatabaseGateway
  implements LessonGateway
{
  mapper: DatabaseLessonMapper = new DatabaseLessonMapper()

  async create(data: Lesson): Promise<void> {
    await this.db.lesson.create({
      data: this.mapper.to(data),
    })
  }

  async findManyModuleLessons(moduleId: ID): Promise<Lesson[]> {
    const lessons = await this.db.lesson.findMany({
      where: {
        moduleId: moduleId.value,
      },
    })

    return lessons.map(this.mapper.from)
  }
}
