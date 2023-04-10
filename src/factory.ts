import {
  AssertedType,
  GuardedType,
  InvertedTypeAssert,
  InvertedTypeAssertOf,
  InvertedTypeEnsure,
  InvertedTypeEnsureOf,
  InvertedTypeFallback,
  InvertedTypeGuard,
  Not,
  TypeAssert,
  TypeAssertOf,
  TypeEnsure,
  TypeEnsureOf,
  TypeErrorMessage,
  TypeFallback,
  TypeGuard
} from './type'

function createErrorMessage(value: unknown, message: TypeErrorMessage): string {
  if (typeof message === 'function') {
    return message(value)
  }
  return message
}

/**
 * @description create a type guard from a type predicate
 * @template T
 * @typeParam type guard
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
 */
export function createGuard<T>(guard: (arg: unknown) => arg is T): TypeGuard<T>

export function createGuard(guard: (arg: unknown) => boolean): TypeGuard {
  return guard as TypeGuard<unknown>
}

/**
 *
 * @param guard
 * @returns
 */
export function not<T extends TypeGuard<unknown>>(guard: T): Not<T> {
  return ((target: unknown) => !guard(target)) as Not<T>
}

export function createAssertion<T extends TypeGuard>(
  guard: T,
  message: TypeErrorMessage
): TypeAssertOf<T>

export function createAssertion<T extends TypeGuard>(
  guard: Not<T>,
  message: TypeErrorMessage
): InvertedTypeAssertOf<T>

export function createAssertion(
  guard: TypeGuard | InvertedTypeGuard,
  message: TypeErrorMessage
): TypeAssert | InvertedTypeAssert {
  return ((target: unknown, overrideMessage?: TypeErrorMessage) => {
    if (!guard(target)) {
      throw new TypeError(createErrorMessage(target, overrideMessage ?? message))
    }
  }) as TypeAssert | InvertedTypeAssert
}

export function createEnsure<T extends TypeGuard>(assert: TypeAssertOf<T>): TypeEnsureOf<T>

export function createEnsure<T extends TypeGuard>(
  assert: InvertedTypeAssertOf<T>
): InvertedTypeEnsureOf<T>

export function createEnsure(
  assert: TypeAssert | InvertedTypeAssert
): TypeEnsure | InvertedTypeEnsure {
  return ((target: unknown, overrideMessage?: TypeErrorMessage) => {
    assert(target, overrideMessage)
    return target
  }) as TypeEnsure | InvertedTypeEnsure
}

export function createFallback<T extends TypeGuard>(guard: T): TypeFallback<GuardedType<T>>
export function createFallback<T extends TypeGuard>(
  guard: Not<T>
): InvertedTypeFallback<GuardedType<T>>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createFallback(
  guard: TypeGuard | InvertedTypeGuard
): TypeFallback | InvertedTypeFallback {
  return ((target: unknown, fallback: unknown) => (guard(target) ? target : fallback)) as
    | TypeFallback
    | InvertedTypeFallback
}
