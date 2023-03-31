
export type TypeErrorMessage = string | ((target: unknown) => string)

function createErrorMessage(value: unknown, message: TypeErrorMessage): string {
  if (typeof message === "function") {
    return message(value)
  }
  return message
}

/**
 *
 */
export interface PartialTypeGuard<T, U extends T> {
  (target: T): target is U
}

/**
 *
 */
export type TypeGuard<T> = PartialTypeGuard<unknown, T>

/**
 *
 */
type GuardedType<T extends PartialTypeGuard<any, unknown>> = T extends PartialTypeGuard<any, infer U> ? U : never

/**
 *
 * @param guard
 */
export function createGuard<T extends TypeGuard<any>>(guard: T): T;

/**
 *
 * @param guard
 */
export function createGuard<T>(guard: (arg: unknown) => boolean): TypeGuard<T>;

export function createGuard(guard: (arg: unknown) => boolean): TypeGuard<any> {
  return guard as TypeGuard<any>
}

/**
 *
 */
export interface Not<T extends TypeGuard<any>> {
  <U>(target: U): target is Exclude<U, GuardedType<T>>
}

/**
 *
 * @param guard
 * @returns
 */
export function not<T extends TypeGuard<any>>(guard: T): Not<T> {
  return ((target: unknown) => !guard(target)) as Not<T>
}

/**
 *
 */
export interface PartialTypeAssert<T, U extends T> {
  (target: T, message?: TypeErrorMessage): asserts target is U
}

/**
 *
 */
export type TypeAssert<T> = PartialTypeAssert<unknown, T>

/**
 *
 */
type AssertedType<T extends PartialTypeAssert<any, unknown>> = T extends PartialTypeAssert<any, infer U> ? U : never

/**
 *
 * @param guard
 * @param message
 * @returns
 */
export function createAssertion<T extends TypeGuard<any>>(guard: T, message: TypeErrorMessage): TypeAssert<GuardedType<T>> {
  return (target: unknown, overrideMessage?: TypeErrorMessage) => {
    if (!guard(target)) {
      throw new TypeError(createErrorMessage(target, overrideMessage ?? message))
    }
  }
}

/**
 *
 */
export interface PartialTypeEnsure<T, U extends T> {
  <A extends T>(target: A, message?: TypeErrorMessage): A extends U ? U : never
}

/**
 *
 */
export type TypeEnsure<T> = PartialTypeEnsure<unknown, T>

/**
 *
 * @param assert
 * @returns
 */
export function createEnsure<T extends TypeAssert<any>>(assert: T): TypeEnsure<AssertedType<T>> {
  return (target: unknown, overrideMessage?: TypeErrorMessage) => {
    assert(target, overrideMessage)
    return target as AssertedType<T>
  }
}
