import { ObjectType, Field } from '@nestjs/graphql'
import { Course } from '../domain/course.model'
import { HttpModule } from '../../../modules/entities/http/http-module.model'

export interface CreateHttpCourseProps {
  id: string
  code: string
  title: string
  description: string
}

@ObjectType()
export class HttpCourse {
  @Field()
  id: string

  @Field()
  code: string

  @Field()
  title: string

  @Field()
  description: string

  @Field(() => [HttpModule])
  modules: HttpModule

  private constructor(props: CreateHttpCourseProps) {
    this.id = props.id
    this.code = props.code
    this.title = props.title
    this.description = props.description
  }

  static fromEntity(course: Course) {
    return new HttpCourse({
      id: course.id.value,
      code: course.code.value,
      title: course.title,
      description: course.description,
    })
  }
}
