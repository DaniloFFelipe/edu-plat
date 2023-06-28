import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { CourseService } from './course.service'
import { CreateCourseInput } from './dto/create-course.input'
import { UpdateCourseInput } from './dto/update-course.input'
import { HttpCourse } from './entities/http/http-course.model'
import { FindByCodeInput } from './dto/find-by-code.input'
import { CurrentUser } from 'src/auth/current-user.decorator'
import { EmptyReturn } from '../core/http/empty-return'
import { HttpModule } from '../modules/entities/http/http-module.model'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'

@Resolver(() => HttpCourse)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Mutation(() => EmptyReturn)
  @UseGuards(AuthGuard)
  async createCourse(@Args('data') input: CreateCourseInput) {
    await this.courseService.create(input)
    return EmptyReturn.build('SUCCESS')
  }

  @Mutation(() => EmptyReturn)
  @UseGuards(AuthGuard)
  async createUpdate(@Args('data') input: UpdateCourseInput) {
    await this.courseService.update(input.id, { ...input })
    return EmptyReturn.build('SUCCESS')
  }

  @Query(() => HttpCourse, { name: 'findCourseByCode' })
  @UseGuards(AuthGuard)
  findByCode(@Args('data') input: FindByCodeInput) {
    return this.courseService.findByCode(input.code)
  }

  @Query(() => [HttpCourse], { name: 'findMyCoursers' })
  @UseGuards(AuthGuard)
  findUserCoursers(@CurrentUser() user: { sub: string }) {
    return this.courseService.findUserCoursers(user.sub)
  }

  @ResolveField()
  @UseGuards(AuthGuard)
  async modules(@Parent() httpCourse: HttpCourse) {
    const modules = await this.courseService.findModules(httpCourse.id)
    return modules.map(HttpModule.fromDomain)
  }
}
