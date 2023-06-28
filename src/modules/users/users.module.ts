import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { Authentication } from './use-cases/authentication'
import { Register } from './use-cases/register'
import { UserGateway } from './gateways/user.gateway'
import { UserDatabaseGateway } from './gateways/user-database.gateway'
import { UserPrismaMapper } from './mappers/user-prisma.mapper'
import { DatabaseModule } from 'src/database/database.module'
import { AuthModule } from 'src/auth/auth.module'
import { Me } from './use-cases/me'

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [
    UsersResolver,
    UsersService,
    Authentication,
    Register,
    Me,
    UserPrismaMapper,
    {
      useClass: UserDatabaseGateway,
      provide: UserGateway,
    },
  ],
})
export class UsersModule {}
