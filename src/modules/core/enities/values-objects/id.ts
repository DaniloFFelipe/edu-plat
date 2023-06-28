import { randomUUID } from 'node:crypto'

export class ID {
  private _value: string

  constructor(value: string = randomUUID()) {
    this._value = value
  }

  get value() {
    return this._value
  }
}
