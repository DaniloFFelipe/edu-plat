import { Injectable } from '@nestjs/common'
import { CreateCourseInput } from './dto/create-course.input'
import { UpdateCourseInput } from './dto/update-course.input'
import { CreateCourse } from './usecases/create-course'
import { UpdateCourse } from './usecases/udpate-course'
import { FindUserCoursers } from './usecases/find-user-coursers'
import { FindCourseByCode } from './usecases/find-courser-by-code'
import { HttpCourse } from './entities/http/http-course.model'
import { HttpException } from '../core/exceptions/http-exceptions'
import { FindCoursersModules } from '../modules/usecases/find-coursers-modules'

@Injectable()
export class CourseService {
  constructor(
    private createCourseUS: CreateCourse,
    private updateCourseUS: UpdateCourse,
    private findUserCoursersUS: FindUserCoursers,
    private findCourseByCodeUS: FindCourseByCode,
    private findCoursersModulesUS: FindCoursersModules,
  ) {}

  async create(input: CreateCourseInput) {
    await this.createCourseUS.execute(input)
  }

  async findByCode(code: string) {
    const result = await this.findCourseByCodeUS.execute({ code })
    if (result.isLeft()) {
      throw HttpException.build(result.value)
    }

    return HttpCourse.fromEntity(result.value)
  }

  async findUserCoursers(userId: string) {
    const result = await this.findUserCoursersUS.execute({ userId })
    if (result.isLeft()) {
      throw HttpException.build(result.value)
    }

    return result.value.map(HttpCourse.fromEntity)
  }

  async update(id: string, updateCourseInput: UpdateCourseInput) {
    await this.updateCourseUS.execute({
      id,
      ...updateCourseInput,
    })
  }

  findModules(id: string) {
    return this.findCoursersModulesUS.execute({ courseId: id })
  }
}
