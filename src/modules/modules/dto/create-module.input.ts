import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateModuleInput {
  @Field()
  title: string

  @Field()
  courseId: string
}
