import { ObjectType, Field } from '@nestjs/graphql'
import { User } from '../user.entity'

export interface HttpUserProps {
  id: string
  name: string
  code: string
  username: string
  email: string
  picture: string
}

@ObjectType()
export class HttpUser {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  code: string

  @Field()
  username: string

  @Field()
  email: string

  @Field()
  picture: string

  constructor(props: HttpUserProps) {
    this.id = props.id
    this.name = props.name
    this.code = props.code
    this.username = props.username
    this.email = props.email
    this.picture = props.picture
  }

  static fromEntity(user: User) {
    return new HttpUser({
      id: user.id.value,
      name: user.name,
      code: user.code,
      username: user.username,
      email: user.email,
      picture: user.picture,
    })
  }
}
