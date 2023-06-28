import { BaseEntity } from 'src/modules/core/enities/base-entity'
import { ID } from 'src/modules/core/enities/values-objects/id'

export interface ModuleProps {
  title: string
  courseId: ID
}

export interface CreateModuleProps {
  title: string
  courseId: string
}

export class Module extends BaseEntity<ModuleProps> {
  static build(props: CreateModuleProps, id?: string) {
    return new Module(
      {
        courseId: new ID(props.courseId),
        title: props.title,
      },
      id,
    )
  }

  get title() {
    return this._props.title
  }

  get courseId() {
    return this._props.courseId
  }
}
