import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SubscribeInput {
  @Field()
  code: string
}
