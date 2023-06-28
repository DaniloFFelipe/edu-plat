import { Module } from '@nestjs/common'
import { LessonsService } from './lessons.service'
import { LessonsResolver } from './lessons.resolver'
import { FindModuleLessons } from './usecases/find-modules-lessons'
import { CreateLesson } from './usecases/create-lesson'
import { DatabaseLessonGateway } from './gateways/database-lesson.gateway'
import { LessonGateway } from './gateways/lesson.gateway'
import { AuthModule } from 'src/auth/auth.module'
import { DatabaseModule } from 'src/database/database.module'

@Module({
  imports: [AuthModule, DatabaseModule],
  providers: [
    LessonsResolver,
    LessonsService,
    FindModuleLessons,
    CreateLesson,
    {
      useClass: DatabaseLessonGateway,
      provide: LessonGateway,
    },
  ],
  exports: [LessonsService],
})
export class LessonsModule {}
