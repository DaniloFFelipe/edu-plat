import { Inject } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'

export abstract class DatabaseGateway {
  @Inject()
  protected db: DatabaseService
}
