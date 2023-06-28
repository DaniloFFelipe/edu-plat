import { Field, ObjectType } from '@nestjs/graphql'

type ReturnStatus = 'SUCCESS' | 'FAILURE'

@ObjectType()
export class EmptyReturn {
  @Field()
  status: ReturnStatus

  private constructor(status: ReturnStatus) {
    this.status = status
  }

  static build(status: ReturnStatus) {
    return new EmptyReturn(status)
  }
}
