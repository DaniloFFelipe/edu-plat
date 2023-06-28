import { Injectable } from '@nestjs/common'
import { DatabaseGateway } from 'src/modules/core/gateways/database.gateway'

import { ModuleGateway } from './module.gateway'
import { Module } from '../entities/domain/module.model'
import { ID } from 'src/modules/core/enities/values-objects/id'

@Injectable()
export class DatabaseModuleGateway
  extends DatabaseGateway
  implements ModuleGateway
{
  async create(data: Module): Promise<void> {
    await this.db.module.create({
      data: {
        id: data.id.value,
        title: data.title,
        courseId: data.courseId.value,
      },
    })
  }

  async getModulesByCourse(courseId: ID): Promise<Module[]> {
    const modules = await this.db.module.findMany({
      where: {
        courseId: courseId.value,
      },
    })

    return modules.map((m) =>
      Module.build(
        {
          courseId: m.courseId,
          title: m.title,
        },
        m.id,
      ),
    )
  }
}
