import { createAssertion, createEnsure, createFallback, not } from '../../lib/factory'
import { InvertedTypeGuard } from '../../lib/types'
import { isEmpty, Empty } from '../empty'

interface GuardNotEmpty extends InvertedTypeGuard<Empty> {
  <T>(target: T | {}): target is unknown extends T ? {} : Exclude<T, Empty>
}

export const isNotEmpty = not(isEmpty) as GuardNotEmpty
