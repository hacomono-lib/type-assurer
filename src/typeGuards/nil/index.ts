import { errorMessage } from '../../lib/error'
import { createAssertion, createEnsure, not } from '../../lib/factory'
import { InvertedTypeAssertOf, InvertedTypeEnsureOf, TypeAssertOf, TypeGuard } from '../../lib/type'

/**
 * Checks if a value is null or undefined.
 * @param target The value to check.
 * @returns True if the value is null or undefined, false otherwise.
 * @example
 * ```ts
 * const target = getTarget() // undefined | string
 * if (isNil(target)) {
 *   // target is undefined
 * }
 * ```
 */
export const isNil = ((target: unknown): target is null | undefined => target == null) as TypeGuard<null | undefined>

type IsNil = typeof isNil

/**
 * Asserts that a value is null or undefined.
 * @param target The value to check.`
 * @param message (optional) The error message to throw if the value is not null or undefined.
 * @throws A TypeError with the given message if the value is not null or undefined.
 * @example
 * ```ts
 * const target = getTarget() // undefined | string
 * assertNil(target, 'target must be null or undefined')
 * // target is undefined
 * ```
 */
export const assertNil: TypeAssertOf<IsNil> = createAssertion(
  isNil,
  errorMessage('null or undefined')
)

/**
 * `ensureNil` is not needed because it is not useful.
 * @deprecated
 */
export declare const ensureNil: never

/**
 * `fallbackNil` is not needed because it is not useful.
 * @deprecated
 */
export declare const fallbackNil: never

/**
 * Checks if a value is not null or undefined.
 *
 * In an if statement, it is simpler to use ! operator is simpler,
 * but this method is useful in cases where the argument is a type guard function, such as Array.prototype.filter.
 * @param target The value to check.
 * @returns True if the value is not null or undefined, false otherwise.
 * @example
 * ```ts
 * const targets = getTargets() // Array<undefined | string>
 * const result = targets.filter(isNotNil)
 * // result is string[]
 * ```
 */
export const isNotNil = not(isNil)

/**
 * Asserts that a value is not null or undefined.
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
export const assertNotNil: InvertedTypeAssertOf<IsNil> = createAssertion(
  isNotNil,
  errorMessage('null or undefined', { not: true })
)

/**
 * Ensures that a value is not null or undefined.
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
export const ensureNotNil: InvertedTypeEnsureOf<IsNil> = createEnsure(assertNotNil)

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
