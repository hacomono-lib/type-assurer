/**
 * @description error message factory receives the target value as the first argument
 */
export type TypeErrorMessage = string | ((target: unknown) => string)

type Branded<T extends string> = {
  [_ in `__branded_${T}`]: never
}

/**
 * @description type guard
 */
export interface TypeGuard<T = unknown> extends Branded<'type_guard'> {
  (target: unknown): target is T
}

/**
 * @description inverted type guard
 */
export interface InvertedTypeGuard<T = unknown> extends Branded<'inverted_type_guard'> {
  <U>(target: T | U): target is U
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
 *
 */
export interface TypeAssert<T = unknown> extends Branded<'type_assert'> {
  (target: unknown, message?: TypeErrorMessage): asserts target is T
}

/**
 *
 */
export interface InvertedTypeAssert<T = unknown> extends Branded<'inverted_type_assert'> {
  <U>(target: U | T, message?: TypeErrorMessage): asserts target is U
}

/**
 *
 */
export type TypeAssertOf<T extends TypeGuard> = TypeAssert<GuardedType<T>>

/**
 *
 */
export type InvertedTypeAssertOf<T extends TypeGuard> = InvertedTypeAssert<GuardedType<T>>

/**
 *
 */
export interface TypeEnsure<T = unknown> extends Branded<'type_ensurer'> {
  <U>(target: U, message?: TypeErrorMessage): U extends T ? U : never
}

/**
 *
 */
export interface InvertedTypeEnsure<T = unknown> extends Branded<'inverted_type_ensurer'> {
  <U>(target: U | T, message?: TypeErrorMessage): U extends T ? never : U
}

/**
 *
 */
export type TypeEnsureOf<T extends TypeGuard> = TypeEnsure<GuardedType<T>>

/**
 *
 */
export type InvertedTypeEnsureOf<T extends TypeGuard> = InvertedTypeEnsure<GuardedType<T>>

/**
 *
 */
export interface PartialFallback<T, U extends T> {
  <V extends T, W extends U & V>(target: V, fallback: W): V extends U ? U : W
}

/**
 *
 */
export interface TypeFallback<T = unknown> extends Branded<'type_fallback'> {
  <U, V extends T>(target: U, fallback: V): U extends T ? U : V
}

/**
 *
 */
export interface InvertedTypeFallback<T = unknown> extends Branded<'inverted_type_fallback'> {
  <U, V>(target: U, fallback: Exclude<V, T>): U extends T ? V : U
}

/**
 *
 */
export type TypeFallbackOf<T extends TypeGuard> = TypeFallback<GuardedType<T>>

/**
 *
 */
export type InvertedTypeFallbackOf<T extends TypeGuard> = InvertedTypeFallback<GuardedType<T>>
