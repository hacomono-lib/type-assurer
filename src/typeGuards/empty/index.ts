import { createAssertion, createEnsure, createFallback, not } from '../../lib/factory'
import type {
  InvertedTypeAssertOf,
  InvertedTypeEnsureOf,
  InvertedTypeFallbackOf,
  InvertedTypeGuard,
  TypeAssertOf,
  TypeEnsureOf,
  TypeFallbackOf,
  TypeGuard
} from '../../lib/types'
import { errorMessage } from '../../lib/error'
import type { Empty } from './type'
import { T } from 'vitest/dist/reporters-5f784f42.js'

export interface EmptyTypeGuard extends TypeGuard<Empty> {
  <T>(target: unknown): target is Exclude<T, Empty>
}

export const isEmpty = (target: unknown): boolean => {
  if (target === null || target === undefined) {
    return true
  }

  if (typeof target === 'string') {
    return target.length === 0
  }

  if (typeof target === 'object') {
    return Object.keys(target).length === 0
  }

  return false
}
