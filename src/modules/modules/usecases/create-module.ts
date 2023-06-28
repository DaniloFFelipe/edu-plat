import { Injectable } from '@nestjs/common'
import { Module } from '../entities/domain/module.model'
import { ModuleGateway } from '../gateway/module.gateway'

export type CreateModuleInput = {
  courseId: string
  title: string
}

@Injectable()
export class CreateModule {
  constructor(private modulesGateway: ModuleGateway) {}

  async execute({ courseId, title }: CreateModuleInput) {
    const module = Module.build({
      courseId,
      title,
    })
    await this.modulesGateway.create(module)

    return module
  }
}
