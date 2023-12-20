/**
 * @description error message factory receives the target value as the first argument
 */
export type TypeErrorMessage = string | ((target: unknown) => string)

/**
 * @description type guard
 */
export interface TypeGuard<T = unknown> {
  <U extends T>(target: unknown): target is U
}

/**
 * @description inverted type guard
 */
export interface InvertedTypeGuard<T = unknown> {
  <U>(target: T | U): target is unknown extends T | U ? unknown : Exclude<U, T>
}

/**
 * @description inverted type guard
 */
export type Not<T extends TypeGuard> = InvertedTypeGuard<GuardedType<T>>

/**
 *
 */
export type GuardedType<T extends TypeGuard | InvertedTypeGuard> = T extends TypeGuard<infer U>
  ? U
  : T extends InvertedTypeGuard<infer U>
    ? U
    : never

/**
 * @description type assertion.
 */
export interface TypeAssert<T = unknown> {
  (target: unknown, message?: TypeErrorMessage): asserts target is T
}

/**
 * @description assert function. but it does not assert types.
 */
export interface VoidAssert {
  (target: unknown, message?: TypeErrorMessage): void
}

/**
 *
 */
export type TypeAssertOf<T extends TypeGuard> = TypeAssert<GuardedType<T>>

/**
 * @description type ensure.
 */
export interface TypeEnsure<T = unknown> {
  <U>(target: U, message?: TypeErrorMessage): unknown extends U ? T : Extract<U, T> extends never ? T : Extract<U, T>
}

/**
 *
 */
export type TypeEnsureOf<T extends TypeGuard> = TypeEnsure<GuardedType<T>>

/**
 * @description type fallback.
 */
export interface TypeFallback<T = unknown> {
  <U, V extends T>(target: U, fallback: V):
    | (unknown extends U ? T : Extract<U, T> extends never ? T : Extract<U, T>)
    | V
}

/**
 *
 */
export type TypeFallbackOf<T extends TypeGuard> = TypeFallback<GuardedType<T>>
