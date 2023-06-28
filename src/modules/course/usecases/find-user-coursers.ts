import { Injectable } from '@nestjs/common'
import { GeneralError } from 'src/modules/core/errors/general.error'
import { Either, right } from 'src/modules/core/types/either'
import { Course } from '../entities/domain/course.model'
import { CourseGateway } from '../gateways/course.gateway'
import { ID } from 'src/modules/core/enities/values-objects/id'

export type FindUserCoursersInput = {
  userId: string
}
export type FindUserCoursersOutput = Either<GeneralError, Course[]>

@Injectable()
export class FindUserCoursers {
  constructor(private gateway: CourseGateway) {}

  async execute({
    userId,
  }: FindUserCoursersInput): Promise<FindUserCoursersOutput> {
    const courses = await this.gateway.findManyUserCourses(new ID(userId))
    return right(courses)
  }
}
