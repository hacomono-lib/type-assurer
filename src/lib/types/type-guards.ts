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
  <U extends T>(target: unknown, message?: TypeErrorMessage): asserts target is U
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
  <U, V extends T>(target: U | V, message?: TypeErrorMessage): unknown extends U
    ? T
    : Extract<U, T> extends never
      ? T
      : Extract<U, T>

  <W extends T>(target: unknown, message?: TypeErrorMessage): unknown extends W
    ? T
    : Extract<W, T> extends never
      ? T
      : Extract<W, T>
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

  <X extends T>(target: unknown, fallback: X):
    | (unknown extends X ? T : Extract<X, T> extends never ? T : Extract<X, T>)
    | X
}

/**
 *
 */
export type TypeFallbackOf<T extends TypeGuard> = TypeFallback<GuardedType<T>>
