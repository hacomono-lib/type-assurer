import { TypeErrorMessage, createAssertion, createEnsure, errorMessage, not } from '../../lib'

import { type Nil, isNil } from '../nil'

interface GuardNotNil {
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  <T>(target: T | {}): target is unknown extends T ? {} : Exclude<T, Nil>
}

interface AssertNotNil {
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  <T>(target: T | {}, message?: TypeErrorMessage): asserts target is unknown extends T ? {} : Exclude<T, Nil>
}

interface EnsureNotNil {
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  <T>(target: T | {}, message?: TypeErrorMessage): unknown extends T ? {} : Exclude<T, Nil>
}

/**
 * Checks if a value is not null or undefined.
 * @param target The value to check.
 * @returns True if the value is not null or undefined, false otherwise.
 * @example
 * ```ts
 * const value = await getValue() // Response | undefined
 *
 * if (isNotNil(value)) {
 *   // value is Response
 * }
 * ```
 */
export const isNotNil = not(isNil) as GuardNotNil

/**
 * Asserts that a value is not null or undefined.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is null or undefined.
 * @throws A TypeError with the given message if the value is null or undefined.
 * @example
 * ```ts
 * const target = getTarget() // undefined | string
 * assertNotNil(target, 'target must not be null or undefined')
 * // target is string
 * ```
 */
export const assertNotNil: AssertNotNil = createAssertion(not(isNil), errorMessage('null or undefined', { not: true }))

/**
 * Ensures that a value is not null or undefined.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is null or undefined.
 * @returns The value if it is not null or undefined.
 * @throws A TypeError with the given message if the value is null or undefined.
 * @example
 * ```ts
 * const target = getTarget() // undefined | string
 * const result = ensureNotNil(target, 'target must not be null or undefined')
 * // result is string
 * ```
 */
export const ensureNotNil: EnsureNotNil = createEnsure(not(isNil), errorMessage('null or undefined', { not: true }))

/**
 * `fallbackNotNil` is not needed because it is not useful.
 * @deprecated use ?? operator instead
 * @example
 * ```ts
 * const target = getTarget() // undefined | string
 * const result = target ?? 'default' // use ?? operator instead
 * // result is string
 * ```
 */
export declare const fallbackNotNil: never
