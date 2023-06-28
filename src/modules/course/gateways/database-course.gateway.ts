import { Code } from 'src/modules/core/enities/values-objects/code'
import { ID } from 'src/modules/core/enities/values-objects/id'
import { Course } from '../entities/domain/course.model'
import { CourseGateway } from './course.gateway'
import { DatabaseService } from 'src/database/database.service'
import { DatabaseMapper } from '../mappers/database.mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DatabaseCourseGateway extends CourseGateway {
  constructor(private db: DatabaseService, private mapper: DatabaseMapper) {
    super()
  }

  async findById(id: ID): Promise<Course | null> {
    const course = await this.db.course.findUnique({
      where: {
        id: id.value,
      },
    })

    if (!course) return null

    return this.mapper.from(course)
  }

  async findByCode(code: Code): Promise<Course> {
    const course = await this.db.course.findUnique({
      where: {
        code: code.value,
      },
    })

    if (!course) return null

    return this.mapper.from(course)
  }

  async findManyUserCourses(userId: ID): Promise<Course[]> {
    const courses = await this.db.course.findMany({
      where: {
        subcribers: {
          some: {
            userId: userId.value,
          },
        },
      },
    })

    return courses.map(this.mapper.from)
  }

  async create(data: Course): Promise<void> {
    await this.db.course.create({
      data: this.mapper.to(data),
    })
  }

  async save(data: Course): Promise<void> {
    await this.db.course.update({
      where: { id: data.id.value },
      data: this.mapper.to(data),
    })
  }
}
