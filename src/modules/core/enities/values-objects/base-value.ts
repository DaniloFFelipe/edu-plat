export abstract class BaseValue<T> {
  protected _value: T

  protected constructor(value: T) {
    this._value = value
  }

  get value() {
    return this._value
  }
}
