import { Module } from '@nestjs/common'
import { ModulesService } from './modules.service'
import { ModulesResolver } from './modules.resolver'
import { DatabaseModuleGateway } from './gateway/database-module.gateway'
import { ModuleGateway } from './gateway/module.gateway'
import { DatabaseModule } from 'src/database/database.module'
import { FindCoursersModules } from './usecases/find-coursers-modules'
import { CreateModule } from './usecases/create-module'
import { LessonsModule } from '../lessons/lessons.module'

@Module({
  imports: [DatabaseModule, LessonsModule],
  providers: [
    ModulesResolver,
    ModulesService,
    FindCoursersModules,
    CreateModule,
    {
      useClass: DatabaseModuleGateway,
      provide: ModuleGateway,
    },
  ],
  exports: [ModuleGateway, FindCoursersModules],
})
export class ModulesModule {}
