import { ObjectType, Field } from '@nestjs/graphql'
import { CreateModuleProps, Module } from '../domain/module.model'
import { HttpLesson } from 'src/modules/lessons/entities/http/lesson.model'

@ObjectType()
export class HttpModule {
  @Field()
  id: string

  @Field()
  title: string

  @Field(() => [HttpLesson])
  lessons: HttpLesson[]

  courseId: string

  constructor(props: CreateModuleProps & { id: string }) {
    this.id = props.id
    this.title = props.title
    this.courseId = props.courseId
  }

  static fromDomain(data: Module) {
    return new HttpModule({
      id: data.id.value,
      title: data.title,
      courseId: data.courseId.value,
    })
  }
}
