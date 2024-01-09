import type { TypeGuard } from '~/lib'

export type Nil = null | undefined

/**
 * Checks if a value is null or undefined.
 *
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
export const isNil = ((target: unknown) => target == null) as TypeGuard<Nil>

/**
 * `assertNil` is not needed because it is not useful.
 * @deprecated
 */
export declare const assertNil: never

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
