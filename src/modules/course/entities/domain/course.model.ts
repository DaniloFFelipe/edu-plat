import { BaseEntity } from 'src/modules/core/enities/base-entity'
import { Code } from 'src/modules/core/enities/values-objects/code'

export interface CourseProps {
  code: Code
  title: string
  description: string
}

export interface CreateCourseProps {
  code?: string
  title: string
  description: string
}

export class Course extends BaseEntity<CourseProps> {
  get code() {
    return this._props.code
  }

  get title() {
    return this._props.title
  }

  get description() {
    return this._props.description
  }

  set title(value: string) {
    this._props.title = value
  }

  set description(value: string) {
    this._props.description = value
  }

  static build(props: CreateCourseProps, id?: string) {
    return new Course(
      {
        code: Code.build(props.code),
        title: props.title,
        description: props.description,
      },
      id,
    )
  }
}
