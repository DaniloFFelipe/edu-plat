import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Session {
  @Field()
  token: string

  static build(token: string) {
    return new Session(token)
  }

  private constructor(token: string) {
    this.token = token
  }
}
