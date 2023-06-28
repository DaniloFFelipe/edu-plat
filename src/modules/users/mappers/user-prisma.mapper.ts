import { User as PUser } from '@prisma/client'
import { UserMapper } from './user.mapper'
import { User } from '../entities/user.entity'

export class UserPrismaMapper extends UserMapper<PUser> {
  from(user: PUser): User {
    return User.build(
      {
        name: user.name,
        code: user.code,
        username: user.username,
        email: user.email,
        password: user.password,
        picture: user.picture,
      },
      user.id,
    )
  }

  to(user: User): PUser {
    return {
      id: user.id.value,
      name: user.name,
      code: user.code,
      username: user.username,
      email: user.email,
      password: user.password.value,
      picture: user.picture,
    }
  }
}
