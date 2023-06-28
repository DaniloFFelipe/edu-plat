import { ID } from 'src/modules/core/enities/values-objects/id'
import { ModuleGateway } from '../gateway/module.gateway'
import { Injectable } from '@nestjs/common'

type Input = {
  courseId: string
}

@Injectable()
export class FindCoursersModules {
  constructor(private modulesGateway: ModuleGateway) {}

  async execute({ courseId }: Input) {
    const modules = await this.modulesGateway.getModulesByCourse(
      new ID(courseId),
    )

    return modules
  }
}
