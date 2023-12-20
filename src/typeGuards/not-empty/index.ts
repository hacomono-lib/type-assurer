import { InvertedTypeGuard, not } from '../../lib'
import { Empty, isEmpty } from '../empty'

interface GuardNotEmpty extends InvertedTypeGuard<Empty> {
  <T>(target: T | {}): target is unknown extends T ? {} : Exclude<T, Empty>
}

export const isNotEmpty = not(isEmpty) as GuardNotEmpty
