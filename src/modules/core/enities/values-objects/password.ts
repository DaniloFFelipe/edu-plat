import { hashSync, compare } from 'bcrypt'
import { BaseValue } from './base-value'

export class Password extends BaseValue<string> {
  equalTo(password: string) {
    return compare(password, this._value)
  }

  static create(password: string) {
    const hash = hashSync(password, 10)
    return new Password(hash)
  }

  static recovery(password: string) {
    return new Password(password)
  }
}
