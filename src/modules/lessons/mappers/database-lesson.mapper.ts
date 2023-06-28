import { Lesson as PLesson } from '@prisma/client'
import { Mapper } from 'src/modules/core/mapper'
import { Lesson } from '../entities/domain/lesson.model'
import { ID } from 'src/modules/core/enities/values-objects/id'

export class DatabaseLessonMapper implements Mapper<PLesson, Lesson> {
  to(t: Lesson): PLesson {
    return {
      id: t.id.value,
      title: t.title,
      duration: t.duration,
      notes: t.notes,
      contentUrl: t.contentUrl,
      createdAt: t.createdAt,
      moduleId: t.moduleId.value,
    }
  }

  from(t: PLesson): Lesson {
    return Lesson.build(
      {
        title: t.title,
        duration: t.duration,
        notes: t.notes,
        contentUrl: t.contentUrl,
        createdAt: t.createdAt,
        moduleId: new ID(t.moduleId),
      },
      t.id,
    )
  }
}
