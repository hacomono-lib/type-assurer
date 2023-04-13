import { createAssertion, createEnsure, createGuard, not } from '../factory'
import { InvertedTypeAssertOf, InvertedTypeEnsureOf, TypeAssertOf } from '../type'

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
export const isNil = createGuard((target: unknown): target is null | undefined => target == null)

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
  (target) => `Expected value is null or undefined, but got ${JSON.stringify(target)}.`
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

// isNotNil is not needed because it is not useful. use ! operator instead.
/**
 * `isNotNil` is not needed because it is not useful.
 * @deprecated
 * @example
 * ```ts
 * const target = getTarget() // undefined | string
 * if (!isNil(target)) { // use ! operator instead
 *  // target is string
 * }
 */
export declare const isNotNil: never

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
  not(isNil),
  (target) => `Expected value is not null or undefined, but got ${target}.`
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
 * @deprecated
 * @example
 * ```ts
 * const target = getTarget() // undefined | string
 * const result = target ?? 'default' // use ?? operator instead
 * // result is string
 * ```
 */
export declare const fallbackNotNil: never
