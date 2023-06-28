import { ID } from 'src/modules/core/enities/values-objects/id'
import { Module } from '../entities/domain/module.model'

export abstract class ModuleGateway {
  abstract getModulesByCourse(courseId: ID): Promise<Module[]>
  abstract create(data: Module): Promise<void>
}
