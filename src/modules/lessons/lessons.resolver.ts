import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { LessonsService } from './lessons.service'
import { CreateLessonInput } from './dto/create-lesson.input'
import { EmptyReturn } from '../core/http/empty-return'
import { HttpLesson } from './entities/http/lesson.model'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'

@Resolver(() => HttpLesson)
export class LessonsResolver {
  constructor(private readonly lessonsService: LessonsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => EmptyReturn)
  async createLesson(@Args('data') createLessonInput: CreateLessonInput) {
    await this.lessonsService.create(createLessonInput)
    return EmptyReturn.build('SUCCESS')
  }
}
