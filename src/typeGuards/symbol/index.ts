import {
  type TypeAssertOf,
  type TypeEnsureOf,
  type TypeFallbackOf,
  type TypeGuard,
  createAssertion,
  createEnsure,
  createFallback,
  errorMessage,
} from '../../lib'

/**
 * Checks if a value is a symbol.
 *
 * @param target The value to check.
 * @returns True if the value is a symbol, false otherwise.
 * @example
 * ```ts
 * const target = getTarget() // symbol | number
 * if (isSymbol(target)) {
 *  // target is symbol
 * }
 * ```
 */
export const isSymbol = ((target: unknown) => typeof target === 'symbol') as TypeGuard<symbol>

type IsSymbol = typeof isSymbol

/**
 * Asserts that a value is a symbol.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a symbol.
 * @throws A TypeError with the given message if the value is not a symbol.
 * @example
 * ```ts
 * const target = getTarget() // symbol | number
 * assertSymbol(target, 'target must be a symbol')
 * // target is symbol
 * ```
 */
export const assertSymbol: TypeAssertOf<IsSymbol> = createAssertion(isSymbol, errorMessage('symbol'))

/**
 * Ensures that a value is a symbol.
 *
 * @param target The value to check.
 * @param message (optional) The error message to throw if the value is not a symbol.
 * @throws A TypeError with the given message if the value is not a symbol.
 * @returns The value if it is a symbol.
 * @example
 * ```ts
 * const target = getTarget() // symbol | number
 * const result = ensureSymbol(target, 'target must be a symbol')
 * // result is symbol
 * ```
 */
export const ensureSymbol: TypeEnsureOf<IsSymbol> = createEnsure(isSymbol, errorMessage('symbol'))

/**
 * Returns a fallback value if a value is not a symbol.
 *
 * @param target The value to check.
 * @param fallback The fallback value to return if the value is not a symbol.
 * @returns The value if it is a symbol, or the fallback value if it is not a symbol.
 * @example
 * ```ts
 * const target = getTarget() // symbol | number
 * const result = fallbackSymbol(target, 'fallback')
 * // result is symbol | 'fallback'
 * ```
 */
export const fallbackSymbol: TypeFallbackOf<IsSymbol> = createFallback(isSymbol)
