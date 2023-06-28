import { Injectable } from '@nestjs/common'
import { GeneralError } from 'src/modules/core/errors/general.error'
import { Either, left, right } from 'src/modules/core/types/either'
import { Course } from '../entities/domain/course.model'
import { CourseGateway } from '../gateways/course.gateway'
import { ID } from 'src/modules/core/enities/values-objects/id'
import { BadRequestError } from 'src/modules/core/errors/bad-request.error'

export type UpdateCourseInput = {
  id: string
  title?: string
  description?: string
}
export type UpdateCourseOutput = Either<GeneralError, Course>

@Injectable()
export class UpdateCourse {
  constructor(private gateway: CourseGateway) {}

  async execute({
    id,
    title,
    description,
  }: UpdateCourseInput): Promise<UpdateCourseOutput> {
    const course = await this.gateway.findById(new ID(id))
    if (!course) return left(new BadRequestError('course-not-found'))

    course.title = title ?? course.title
    course.description = description ?? course.description

    await this.gateway.save(course)
    return right(course)
  }
}
