import { BaseEntity } from 'src/modules/core/enities/base-entity'
import { Password } from 'src/modules/core/enities/values-objects/password'

export interface UserProps {
  name: string
  code: string
  username: string
  email: string
  password: Password
  picture: string
}

export interface CreateUserProps {
  name: string
  code: string
  username: string
  email: string
  password: string
  picture: string
}

export class User extends BaseEntity<UserProps> {
  get name() {
    return this._props.name
  }

  get code() {
    return this._props.code
  }

  get username() {
    return this._props.username
  }

  get email() {
    return this._props.email
  }

  get password() {
    return this._props.password
  }

  get picture() {
    return this._props.picture
  }

  static build({ password, ...props }: CreateUserProps, id?: string) {
    return new User(
      {
        ...props,
        password: id ? Password.create(password) : Password.recovery(password),
      },
      id,
    )
  }
}
