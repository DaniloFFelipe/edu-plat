import { Course as PCourse } from '@prisma/client'
import { Mapper } from 'src/modules/core/mapper'
import { Course } from '../entities/domain/course.model'

export class DatabaseMapper implements Mapper<PCourse, Course> {
  to(t: Course): PCourse {
    return {
      id: t.id.value,
      code: t.code.value,
      description: t.description,
      title: t.title,
    }
  }

  from(t: PCourse): Course {
    return Course.build(
      {
        code: t.code,
        description: t.description,
        title: t.title,
      },
      t.id,
    )
  }
}
