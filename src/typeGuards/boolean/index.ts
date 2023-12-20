import { createAssertion, createEnsure, createFallback, not } from '../../lib'
import { errorMessage } from '../../lib'
import type {
  InvertedTypeAssertOf,
  InvertedTypeEnsureOf,
  InvertedTypeFallbackOf,
  TypeAssertOf,
  TypeEnsureOf,
  TypeFallbackOf,
  TypeGuard,
} from '../../lib/types'

/**
 * Checks if a value is a boolean.
 *
 * @param target The value to check.
 * @returns True if the value is a boolean, false otherwise.
 * @example
 * ```ts
 * const target = getTarget() // boolean | string
 * if (isBoolean(target)) {
 * // target is boolean
 * }
 * ```
 */
export const isBoolean = ((target: unknown): target is boolean => typeof target === 'boolean') as TypeGuard<boolean>

type IsBoolean = typeof isBoolean

/**
 * Asserts that a value is a boolean.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a boolean.
 * @throws A TypeError with the given message if the value is not a boolean.
 * @example
 * ```ts
 * const target = getTarget() // boolean | string
 * assertBoolean(target, 'target must be a boolean')
 * // target is boolean
 * ```
 */

export const assertBoolean: TypeAssertOf<IsBoolean> = createAssertion(isBoolean, errorMessage('boolean'))

/**
 * Ensures that a value is a boolean.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a boolean.
 * @throws A TypeError with the given message if the value is not a boolean.
 * @returns The value if it is a boolean.
 * @example
 * ```ts
 * const target = getTarget() // boolean | string
 * const result = ensureBoolean(target, 'target must be a boolean')
 * // result is boolean
 * ```
 */
export const ensureBoolean: TypeEnsureOf<IsBoolean> = createEnsure(isBoolean, errorMessage('boolean'))

/**
 * Fallbacks to a default value if the value is not a boolean.
 *
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @example
 * ```ts
 * const target = getTarget() // boolean | string
 * const result = fallbackBoolean(target, ['default'])
 * // result is boolean | string
 * ```
 */
export const fallbackBoolean: TypeFallbackOf<IsBoolean> = createFallback(isBoolean)

/**
 * Checks if a value is not a boolean.
 *
 * In an if statement, it is simpler to use ! operator is simpler,
 * but this method is useful in cases where the argument is a type guard function, such as Array.prototype.filter.
 *
 * @param target The value to check.
 * @returns True if the value is not a boolean, false otherwise.
 * @example
 * ```ts
 * const targets = getTargets() // Array<boolean | string>
 * const results = targets.filter(isNotBoolean)
 * // results is Array<string>
 * ```
 */
export const isNotBoolean = not(isBoolean)

/**
 * Asserts that a value is not a boolean.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is a boolean.
 * @throws A TypeError with the given message if the value is a boolean.
 * @example
 * ```ts
 * const target = getTarget() // string | boolean
 * assertNotBoolean(target, 'target must not be a boolean')
 * // target is string
 * ```
 */
export const assertNotBoolean: InvertedTypeAssertOf<IsBoolean> = createAssertion(
  not(isBoolean),
  errorMessage('boolean', { not: true }),
)

/**
 * Enxures that a value is not a boolean.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is a boolean.
 * @throws A TypeError with the given message if the value is a boolean.
 * @returns The value if it is not a boolean.
 * @example
 * ```ts
 * const target = getTarget() // string | boolean
 * const result = ensureNotBoolean(target, 'target must not be a boolean')
 * // result is string
 * ```
 */
export const ensureNotBoolean: InvertedTypeEnsureOf<IsBoolean> = createEnsure(
  not(isBoolean),
  errorMessage('boolean', { not: true }),
)

/**
 * Fallbacks to a default value if the value is not a boolean.
 *
 * @param target The value to check.
 * @param defaultValue The default value to fallback to.
 * @return The value if it is not a boolean, the default value otherwise.
 * @example
 * ```ts
 * const target = getTarget() // string | boolean
 * const result = fallbackNotBoolean(target, 'default')
 * // result is string
 * ```
 */
export const fallbackNotBoolean: InvertedTypeFallbackOf<IsBoolean> = createFallback(not(isBoolean))
