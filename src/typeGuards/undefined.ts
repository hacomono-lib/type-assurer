import { createAssertion, createEnsure, createGuard, not } from '../factory'

/**
 * Checks if a value is undefined.
 * @param target The value to check.
 * @returns True if the value is undefined, false otherwise.
 */
export const isUndefined = createGuard((target: unknown): target is undefined => target === undefined)

/**
 * Asserts that a value is undefined.
 * @param target The value to check.`
 * @param message The error message to throw if the value is not undefined.
 * @throws A TypeError with the given message if the value is not undefined.
 */
export const assertUndefined = createAssertion(isUndefined, 'Expected undefined')

/**
 * Ensures that a value is undefined.
 * @param target The value to check.
 * @param message The error message to throw if the value is not undefined.
 * @returns The value if it is undefined.
 * @throws A TypeError with the given message if the value is not undefined.
 */
export const ensureUndefined = createEnsure(isUndefined)

/**
 * Checks if a value is not undefined.
 * @param target The value to check.
 * @returns True if the value is not undefined, false otherwise.
 */
export const isNotUndefined = not(isUndefined)

/**
 * Asserts that a value is not undefined.
 * @param target The value to check.
 * @param message The error message to throw if the value is undefined.
 * @throws A TypeError with the given message if the value is undefined.
 */
export const assertNotUndefined = createAssertion(isNotUndefined, 'Expected not undefined')

/**
 * Ensures that a value is not undefined.
 * @param target The value to check.
 * @param message The error message to throw if the value is undefined.
 * @returns The value if it is not undefined.
 * @throws A TypeError with the given message if the value is undefined.
 */
export const ensureNotUndefined = createEnsure(isNotUndefined)
