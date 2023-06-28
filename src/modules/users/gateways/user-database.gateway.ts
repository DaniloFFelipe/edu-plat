import { ID } from 'src/modules/core/enities/values-objects/id'
import { User } from '../entities/user.entity'
import { FindByUsernameAndCodeParams, UserGateway } from './user.gateway'
import { DatabaseService } from 'src/database/database.service'
import { UserPrismaMapper } from '../mappers/user-prisma.mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserDatabaseGateway extends UserGateway {
  constructor(private db: DatabaseService, private dbMapper: UserPrismaMapper) {
    super()
  }

  async findById(id: ID): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: {
        id: id.value,
      },
    })

    return user ? this.dbMapper.from(user) : null
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: {
        email,
      },
    })

    return user ? this.dbMapper.from(user) : null
  }

  async findByUsernameAndCode(
    params: FindByUsernameAndCodeParams,
  ): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: {
        code_username: params,
      },
    })

    return user ? this.dbMapper.from(user) : null
  }

  async create(user: User): Promise<void> {
    const dbUser = this.dbMapper.to(user)

    await this.db.user.create({
      data: dbUser,
    })
  }
}
