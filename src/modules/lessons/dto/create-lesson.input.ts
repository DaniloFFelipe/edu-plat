import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateLessonInput {
  @Field()
  title: string

  @Field()
  duration: string

  @Field()
  notes: string

  @Field()
  contentUrl: string

  @Field()
  moduleId: string
}
