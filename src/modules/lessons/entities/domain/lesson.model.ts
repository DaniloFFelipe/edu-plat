import { BaseEntity } from 'src/modules/core/enities/base-entity'
import { ID } from 'src/modules/core/enities/values-objects/id'
import { Optional } from 'src/modules/core/types/optional'

interface Props {
  title: string
  duration: string
  notes: string
  contentUrl: string
  createdAt: Date
  moduleId: ID
}

export class Lesson extends BaseEntity<Props> {
  static build(props: Optional<Props, 'createdAt'> & {}, id?: string) {
    return new Lesson(
      {
        title: props.title,
        duration: props.duration,
        notes: props.notes,
        contentUrl: props.contentUrl,
        createdAt: props.createdAt ?? new Date(),
        moduleId: props.moduleId,
      },
      id,
    )
  }

  get moduleId() {
    return this._props.moduleId
  }

  get title() {
    return this._props.title
  }

  get duration() {
    return this._props.duration
  }

  get notes() {
    return this._props.notes
  }

  get contentUrl() {
    return this._props.contentUrl
  }

  get createdAt() {
    return this._props.createdAt
  }
}
