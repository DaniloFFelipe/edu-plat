import { Injectable } from '@nestjs/common'
import { GeneralError } from 'src/modules/core/errors/general.error'
import { Either, left, right } from 'src/modules/core/types/either'
import { Course } from '../entities/domain/course.model'
import { CourseGateway } from '../gateways/course.gateway'
import { Code } from 'src/modules/core/enities/values-objects/code'
import { BadRequestError } from 'src/modules/core/errors/bad-request.error'

export type FindCourseByCodeInput = {
  code: string
}
export type FindCourseByCodeOutput = Either<GeneralError, Course>

@Injectable()
export class FindCourseByCode {
  constructor(private gateway: CourseGateway) {}

  async execute({
    code,
  }: FindCourseByCodeInput): Promise<FindCourseByCodeOutput> {
    const course = await this.gateway.findByCode(Code.build(code))
    if (!course) return left(new BadRequestError('course-not-found'))
    return right(course)
  }
}
