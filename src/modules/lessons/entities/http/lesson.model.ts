import { ObjectType, Field } from '@nestjs/graphql'
import { Lesson } from '../domain/lesson.model'

interface Props {
  title: string
  id: string
  duration: string
  notes: string
  contentUrl: string
  createdAt: Date
  moduleId: string
}

@ObjectType()
export class HttpLesson {
  @Field()
  id: string

  @Field()
  title: string

  @Field()
  duration: string

  @Field()
  notes: string

  @Field()
  contentUrl: string

  createdAt: Date
  moduleId: string

  constructor(props: Props) {
    this.title = props.title
    this.id = props.id
    this.duration = props.duration
    this.notes = props.notes
    this.contentUrl = props.contentUrl
    this.createdAt = props.createdAt
    this.moduleId = props.moduleId
  }

  static fromDomain(data: Lesson) {
    return new HttpLesson({
      title: data.title,
      id: data.id.value,
      duration: data.duration,
      notes: data.notes,
      contentUrl: data.contentUrl,
      createdAt: data.createdAt,
      moduleId: data.moduleId.value,
    })
  }
}
