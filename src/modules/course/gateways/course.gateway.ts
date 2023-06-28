import { ID } from 'src/modules/core/enities/values-objects/id'
import { Course } from '../entities/domain/course.model'
import { Code } from 'src/modules/core/enities/values-objects/code'
import { Injectable } from '@nestjs/common'

@Injectable()
export abstract class CourseGateway {
  abstract findById(id: ID): Promise<Course | null>
  abstract findByCode(code: Code): Promise<Course | null>
  abstract findManyUserCourses(userId: ID): Promise<Course[]>

  abstract create(data: Course): Promise<void>
  abstract save(data: Course): Promise<void>
}
