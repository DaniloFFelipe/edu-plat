import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ModulesService } from './modules.service'
import { HttpModule } from './entities/http/http-module.model'
import { CreateModuleInput } from './dto/create-module.input'
import { EmptyReturn } from 'src/modules/core/http/empty-return'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'
import { HttpLesson } from '../lessons/entities/http/lesson.model'
import { LessonsService } from '../lessons/lessons.service'

@Resolver(() => HttpModule)
export class ModulesResolver {
  constructor(
    private readonly modulesService: ModulesService,
    private readonly lessonsService: LessonsService,
  ) {}

  @Mutation(() => EmptyReturn)
  @UseGuards(AuthGuard)
  async createModule(@Args('data') input: CreateModuleInput) {
    await this.modulesService.create(input)
    return EmptyReturn.build('SUCCESS')
  }

  @ResolveField(() => [HttpLesson])
  async lessons(@Parent() module: HttpModule) {
    const lessons = await this.lessonsService.findModulesLessons(module.id)
    return lessons.map(HttpLesson.fromDomain)
  }
}
