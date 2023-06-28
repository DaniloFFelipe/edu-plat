import { Injectable } from '@nestjs/common'
import { GeneralError } from 'src/modules/core/errors/general.error'
import { Either, right } from 'src/modules/core/types/either'
import { Course } from '../entities/domain/course.model'
import { CourseGateway } from '../gateways/course.gateway'

export type CreateCourseInput = {
  title: string
  description: string
}
export type CreateCourseOutput = Either<GeneralError, Course>

@Injectable()
export class CreateCourse {
  constructor(private gateway: CourseGateway) {}

  async execute({
    title,
    description,
  }: CreateCourseInput): Promise<CreateCourseOutput> {
    const course = Course.build({ title, description })
    await this.gateway.create(course)
    return right(course)
  }
}
