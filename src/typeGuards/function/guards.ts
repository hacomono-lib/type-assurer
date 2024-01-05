import {
  type TypeAssert,
  type TypeEnsure,
  type TypeFallback,
  type TypeGuard,
  createAssertion,
  createEnsure,
  createFallback,
  errorMessage,
} from '~/lib'

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type AnyFunction = AnyPlainFunction | AnyGeneratorFunction | AnyClass | Function

interface AnyPlainFunction {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  (...args: any[]): any
}

interface AnyGeneratorFunction {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  (...args: any[]): Generator<any, any, any>
}

interface AnyClass {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  new (...args: any[]): any
}

interface IsFunction extends TypeGuard<AnyFunction> {
  /**
   * Checks if a value is a function.
   * @param target The value to check.
   * @returns True if the value is a function, false otherwise.
   * @example
   * ```ts
   * const result = isFunction(() => {})
   * // true
   *
   * const result = isFunction('() => {}')
   * // false
   * ```
   */
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  <T>(target: T): target is unknown extends T ? Function & T : T extends AnyFunction ? T : never
}

export const isFunction = ((target: unknown) => typeof target === 'function') as IsFunction

interface AssertFunction extends TypeAssert<AnyFunction> {
  /**
   * Asserts that a value is a function.
   * @param target The value to check.
   * @param message (optional) The error message to throw if the value is not a function.
   * @throws A TypeError with the given message if the value is not a function.
   * @example
   * ```ts
   * const target = getTarget() // Function | string
   * assertFunction(target, 'target must be a function')
   * // target is Function
   * ```
   */
  <T>(target: T, message?: string): asserts target is unknown extends T
    ? // biome-ignore lint/complexity/noBannedTypes: <explanation>
      Function & T
    : T extends AnyFunction
      ? T
      : never
}

export const assertFunction: AssertFunction = createAssertion(isFunction, errorMessage('function'))

interface EnsureFunction extends TypeEnsure<AnyFunction> {
  /**
   * Ensures that a value is a function.
   * @param target The value to check.
   * @param message (optional) The error message to throw if the value is not a function.
   * @throws A TypeError with the given message if the value is not a function.
   * @returns The value if it is a function.
   * @example
   * ```ts
   * const target = getTarget() // Function | string
   * const result = ensureFunction(target, 'target must be a function')
   * // result is Function
   * ```
   */
  <T>(target: T, message?: string): unknown extends T ? Function & T : T extends AnyFunction ? T : never
}

export const ensureFunction: EnsureFunction = createEnsure(isFunction, errorMessage('function')) as EnsureFunction

interface FallbackFunction extends TypeFallback<AnyFunction> {
  /**
   * Returns a fallback value if a value is not a function.
   *
   * @param target The value to check.
   * @param fallback The value to return if the target is not a function.
   * @returns The fallback value if the target is not a function, otherwise the target.
   * @example
   * ```ts
   * const target = getTarget() // Function | string
   * const result = fallbackFunction(target, () => {})
   * // result is Function
   * ```
   */
  <T, U>(target: T, fallback: U): unknown extends T ? Function & T : T extends AnyFunction ? T : U
}

export const fallbackFunction: FallbackFunction = createFallback(isFunction)
