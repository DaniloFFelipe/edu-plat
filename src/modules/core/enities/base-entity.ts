import { ID } from './values-objects/id'

export abstract class BaseEntity<Props> {
  protected _id: ID
  protected _props: Props

  protected constructor(props: Props, id?: string) {
    this._id = new ID(id)
    this._props = props
  }

  get id() {
    return this._id
  }
}
