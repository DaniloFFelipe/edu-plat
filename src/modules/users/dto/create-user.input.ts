import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field()
  name: string

  @Field()
  code: string

  @Field()
  username: string

  @Field()
  email: string

  @Field()
  password: string

  @Field()
  picture: string
}
