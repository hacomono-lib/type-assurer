import type {
  GuardedType,
  InvertedTypeAssert,
  InvertedTypeAssertOf,
  InvertedTypeEnsure,
  InvertedTypeEnsureOf,
  InvertedTypeFallback,
  Not,
  TypeAssert,
  TypeAssertOf,
  TypeEnsure,
  TypeEnsureOf,
  TypeErrorMessage,
  TypeFallback,
  TypeGuard,
  VoidAssert
} from './type'

import { TypeAssertionError } from './error'

function createErrorMessage(value: unknown, message: TypeErrorMessage): string {
  if (typeof message === 'function') {
    return message(value)
  }
  return message
}

/**
 * @description create a type guard from a type predicate
 * @template T
 * @typeParam T - type guard
 * @param guard {T} type guard function
 * @returns {T} type guard
 * @example
 * ```ts
 * const isString = createGuard((arg: unknown): arg is string => typeof arg === 'string')
 * ```
 */
export function createGuard<T extends TypeGuard>(guard: T): T

/**
 * @description create a type guard from a type predicate
 * @template T
 * @typeParam T - guarded type
 * @param guard {T} type guard predicate
 * @returns {TypeGuard<T>} type guard
 * @example
 * ```ts
 * const isString = createGuard((arg: unknown): arg is string => typeof arg === 'string')
 * ```
 */
export function createGuard<T>(guard: (arg: unknown) => arg is T): TypeGuard<T>

/**
 * @description create a type guard from a type predicate. This is a type-unsafe version of `createGuard`.
 * @param guard {(arg: unknown) => boolean} type guard predicate
 * @returns {TypeGuard} type guard function
 * @example
 * ```ts
 * const isString = createGuard((arg: unknown) => typeof arg === 'string')
 * ```
 */
export function createGuard(guard: (arg: unknown) => boolean): TypeGuard

export function createGuard(guard: (arg: unknown) => boolean): TypeGuard {
  return guard as TypeGuard<unknown>
}

/**
 * @description invert a type guard
 * @template T
 * @typeParam T - type guard
 * @param guard {T} type guard
 * @returns {Not<T>} inverted type guard
 * @example
 * ```ts
 * const isNotString = not(isString)
 * ```
 */
export function not<T extends TypeGuard<unknown>>(guard: T): Not<T>

/**
 * @description invert a type guard.
 * @template T
 * @typeParam T - guarded type
 * @param guard {(arg: unknown) => arg is T} type guard predicate
 * @return {Not<TypeGuard<T>>} inverted type guard
 * @example
 * ```ts
 * const isNotString = not((arg: unknown): arg is string => typeof arg === 'string')
 * ```
 */
export function not<T>(guard: (arg: unknown) => arg is T): Not<TypeGuard<T>>

/**
 * @description invert a type guard. This is a type-unsafe version of `not`.
 * @param guard {(arg: unknown) => boolean} type guard predicate
 * @returns {Not<TypeGuard>} inverted type guard
 * @example
 * ```ts
 * const isNotString = not((arg: unknown) => typeof arg === 'string')
 * ```
 */
export function not(guard: (arg: unknown) => boolean): Not<TypeGuard>

export function not(guard: (arg: unknown) => boolean): Not<TypeGuard> {
  return ((target: unknown) => !guard(target)) as Not<TypeGuard>
}

/**
 * @description create a type assertion from a type guard.
 * @template T
 * @typeParam T - type guard
 * @param guard {T} type guard
 * @param message {TypeErrorMessage} error message or error message factory
 * @returns {TypeAssertOf<T>} type assertion
 * @example
 * ```ts
 * const assertString = createAssertion(isString, 'target must be a string')
 * ```
 */
export function createAssertion<T extends TypeGuard>(
  guard: T,
  message: TypeErrorMessage
): TypeAssertOf<T>

/**
 * @description create a type assertion from a inverted type guard.
 * @template T
 * @typeParam T - type guard
 * @param guard {Not<T>} inverted type guard
 * @param message {TypeErrorMessage} error message or error message factory
 * @return {InvertedTypeAssertOf<T>} inverted type assertion
 * @example
 * ```ts
 * const assertNotString = createAssertion(not(isString), 'target must not be a string')
 * ```
 */
export function createAssertion<T extends TypeGuard>(
  guard: Not<T>,
  message: TypeErrorMessage
): InvertedTypeAssertOf<T>

/**
 * @description create a type assertion from a type predicate.
 * @template T
 * @typeParam T - guarded type
 * @param guard {(arg: unknown) => arg is T} type guard predicate
 * @param message {TypeErrorMessage} error message or error message factory
 * @returns {TypeAssert<T>} type assertion
 * @example
 * ```ts
 * const assertString = createAssertion((arg: unknown): arg is string => typeof arg === 'string', 'target must be a string')
 * ```
 */
export function createAssertion<T>(guard: (target: unknown) => target is T, message: TypeErrorMessage): TypeAssert<T>

/**
 * @description create a type assertion from a type predicate. This is a type-unsafe version of `createAssertion`.
 * @param guard {(arg: unknown) => boolean} type guard predicate
 * @param message {TypeErrorMessage} error message or error message factory
 * @returns {VoidAssert} assert function
 * @example
 * ```ts
 * const assertString = createAssertion((arg: unknown) => typeof arg === 'string', 'target must be a string')
 * ```
 */
export function createAssertion(guard: (target: unknown) => boolean, message: TypeErrorMessage): VoidAssert

export function createAssertion(
  guard: (target: unknown) => boolean,
  message: TypeErrorMessage
): TypeAssert | InvertedTypeAssert | VoidAssert {
  return ((target: unknown, overrideMessage?: TypeErrorMessage) => {
    if (!guard(target)) {
      throw new TypeAssertionError(createErrorMessage(target, overrideMessage ?? message), target)
    }
  }) as TypeAssert | InvertedTypeAssert | VoidAssert
}

/**
 * @description create a type ensure from a type guard.
 * @template T
 * @typeParam T - type guard
 * @param guard {T} type guard
 * @param message {TypeErrorMessage} error message or error message factory
 * @returns {TypeEnsureOf<T>} type ensure
 * @example
 * ```ts
 * const ensureString = createEnsure(isString, 'target must be a string')
 * ```
 */
export function createEnsure<T extends TypeGuard>(guard: TypeGuard<T>, message: TypeErrorMessage): TypeEnsureOf<T>

/**
 * @description create a type ensure from a inverted type guard.
 * @template T
 * @typeParam T - type guard
 * @param guard {Not<T>} inverted type guard
 * @param message {TypeErrorMessage} error message or error message factory
 * @return {InvertedTypeEnsureOf<T>} inverted type ensure
 * @example
 * ```ts
 * const ensureNotString = createEnsure(not(isString), 'target must not be a string')
 * ```
 */
export function createEnsure<T extends TypeGuard>(guard: Not<T>, message: TypeErrorMessage): InvertedTypeEnsureOf<T>

/**
 * @description create a type ensure from a type predicate.
 * @template T
 * @typeParam T - guarded type
 * @param guard {(arg: unknown) => arg is T} type guard predicate
 * @param message {TypeErrorMessage} error message or error message factory
 * @returns {TypeEnsure<T>} type ensure
 * @example
 * ```ts
 * const ensureString = createEnsure((arg: unknown): arg is string => typeof arg === 'string', 'target must be a string')
 * ```
 */
export function createEnsure<T>(guard: (target: unknown) => target is T, message: TypeErrorMessage): TypeEnsure<T>


/**
 * @description create a type ensure from a type predicate. This is a type-unsafe version of `createEnsure`.
 * @param guard {(arg: unknown) => boolean} type guard predicate
 * @param message {TypeErrorMessage} error message or error message factory
 * @returns {TypeEnsure} ensure function
 * @example
 * ```ts
 * const ensureString = createEnsure((arg: unknown) => typeof arg === 'string', 'target must be a string')
 * ```
 */
export function createEnsure(guard: (target: unknown) => boolean, message: TypeErrorMessage): TypeEnsure

export function createEnsure(
  guard: (target: unknown) => boolean,
  message: TypeErrorMessage
): TypeEnsure | InvertedTypeEnsure {
  return ((target: unknown, overrideMessage?: TypeErrorMessage) => {
    const assert = createAssertion(guard, message)
    assert(target, overrideMessage)
    return target
  }) as TypeEnsure | InvertedTypeEnsure
}

/**
 * @description create a type fallback from a type guard.
 * @template T
 * @typeParam T - type guard
 * @param guard {T} type guard
 * @returns {TypeFallback<GuardedType<T>>} type fallback
 * @example
 * ```ts
 * const fallbackString = createFallback(isString)
 * ```
 */
export function createFallback<T extends TypeGuard>(guard: T): TypeFallback<GuardedType<T>>

/**
 * @description create a type fallback from a inverted type guard.
 * @template T
 * @typeParam T - type guard
 * @param guard {Not<T>} inverted type guard
 * @return {InvertedTypeFallback<GuardedType<T>>} inverted type fallback
 * @example
 * ```ts
 * const fallbackNotString = createFallback(not(isString))
 * ```
 */
export function createFallback<T extends TypeGuard>(
  guard: Not<T>
): InvertedTypeFallback<GuardedType<T>>

/**
 * @description create a type fallback from a type predicate.
 * @template T
 * @typeParam T - guarded type
 * @param guard {(arg: unknown) => arg is T} type guard predicate
 * @returns {TypeFallback<T>} type fallback
 * @example
 * ```ts
 * const fallbackString = createFallback((arg: unknown): arg is string => typeof arg === 'string')
 * ```
 */
export function createFallback<T>(guard: (target: unknown) => target is T): TypeFallback<T>

/**
 * @description create a type fallback from a type predicate. This is a type-unsafe version of `createFallback`.
 * @param guard {(arg: unknown) => boolean} type guard predicate
 * @returns {TypeFallback} fallback function
 * @example
 * ```ts
 * const fallbackString = createFallback((arg: unknown) => typeof arg === 'string')
 * ```
 */
export function createFallback(guard: (target: unknown) => boolean): TypeFallback

export function createFallback(
  guard: (target: unknown) => boolean
): TypeFallback | InvertedTypeFallback {
  return ((target: unknown, fallback: unknown) => (guard(target) ? target : fallback)) as TypeFallback | InvertedTypeFallback
}
