import { Mapper } from 'src/modules/core/mapper'
import { User } from '../entities/user.entity'

export abstract class UserMapper<T> implements Mapper<T, User> {
  abstract from(user: T): User
  abstract to(user: User): T
}
