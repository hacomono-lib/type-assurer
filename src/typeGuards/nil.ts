import {
  createAssertion,
  createEnsure,
  createFallback,
  createGuard,
  not
} from '../factory'
import { InvertedTypeAssertOf, InvertedTypeEnsureOf, InvertedTypeFallbackOf, TypeAssertOf } from '../type'

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
export const isNil = createGuard((target): target is null | undefined => target == null)

type IsNil = typeof isNil

/**
 * Asserts that a value is null or undefined.
 * @param target The value to check.`
 * @param message The error message to throw if the value is not null or undefined.
 * @throws A TypeError with the given message if the value is not null or undefined.
 */
export const assertNil: TypeAssertOf<IsNil> = createAssertion(
  isNil,
  (target) => `Expected value is null or undefined, but got ${JSON.stringify(target)}.`
)

// ensureNil is not needed because it is not useful

// fallbackNil is not needed because it is not useful

/**
 * Checks if a value is not null or undefined.
 * @param target The value to check.
 * @returns True if the value is not null or undefined, false otherwise.
 */
export const isNotNil = not(isNil)

/**
 * Asserts that a value is not null or undefined.
 * @param target The value to check.
 * @param message The error message to throw if the value is null or undefined.
 * @throws A TypeError with the given message if the value is null or undefined.
 */
export const assertNotNil: InvertedTypeAssertOf<IsNil> = createAssertion(
  isNotNil,
  (target) => `Expected value is not null or undefined, but got ${target}.`
)

/**
 * Ensures that a value is not null or undefined.
 * @param target The value to check.
 * @param message The error message to throw if the value is null or undefined.
 * @returns The value if it is not null or undefined.
 * @throws A TypeError with the given message if the value is null or undefined.
 */
export const ensureNotNil: InvertedTypeEnsureOf<IsNil> = createEnsure(assertNotNil)

/**
 * Fallbacks to a default value if a value is not null or undefined.
 * @param target The value to check.
 * @param fallback The default value to return if the value is not null or undefined.
 * @returns The value if it is not null or undefined, the default value otherwise.
 */
export const fallbackNotNil: InvertedTypeFallbackOf<IsNil> = createFallback(isNotNil)
