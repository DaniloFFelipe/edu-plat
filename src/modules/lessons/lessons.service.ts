import { Injectable } from '@nestjs/common'
import { CreateLessonInput } from './dto/create-lesson.input'
import { CreateLesson } from './usecases/create-lesson'
import { FindModuleLessons } from './usecases/find-modules-lessons'

@Injectable()
export class LessonsService {
  constructor(
    private createLessonUS: CreateLesson,
    private findModulesLessonsUS: FindModuleLessons,
  ) {}

  create(createLessonInput: CreateLessonInput) {
    return this.createLessonUS.execute(createLessonInput)
  }

  findModulesLessons(moduleId: string) {
    return this.findModulesLessonsUS.execute({ moduleId })
  }
}
