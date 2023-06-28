import { Module } from '@nestjs/common'
import { CourseService } from './course.service'
import { CourseResolver } from './course.resolver'
import { DatabaseModule } from 'src/database/database.module'
import { ModulesModule } from '../modules/modules.module'
import { CourseGateway } from './gateways/course.gateway'
import { DatabaseCourseGateway } from './gateways/database-course.gateway'
import { CreateCourse } from './usecases/create-course'
import { FindCourseByCode } from './usecases/find-courser-by-code'
import { FindUserCoursers } from './usecases/find-user-coursers'
import { UpdateCourse } from './usecases/udpate-course'
import { DatabaseMapper } from './mappers/database.mapper'
import { AuthModule } from 'src/auth/auth.module'
import { SubscriptionsModule } from './subscriptions/subscriptions.module'

@Module({
  imports: [DatabaseModule, ModulesModule, AuthModule, SubscriptionsModule],
  providers: [
    CourseResolver,
    CourseService,
    {
      useClass: DatabaseCourseGateway,
      provide: CourseGateway,
    },
    CreateCourse,
    UpdateCourse,
    FindUserCoursers,
    FindCourseByCode,
    DatabaseMapper,
  ],
  exports: [CourseGateway],
})
export class CourseModule {}
