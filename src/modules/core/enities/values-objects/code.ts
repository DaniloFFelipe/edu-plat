import { BaseValue } from './base-value'
import { customAlphabet } from 'nanoid'

const generator = customAlphabet('1234567890abcdef', 6)

export class Code extends BaseValue<string> {
  private constructor(value: string = generator()) {
    super(value)
  }

  static build(code?: string) {
    return new Code(code)
  }
}
