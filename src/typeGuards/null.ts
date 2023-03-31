import { createAssertion, createEnsure, createGuard, not } from '../factory'

/**
 * Checks if a value is null.
 * @param target The value to check.
 * @returns True if the value is null, false otherwise.
 */
export const isNull = createGuard((target: unknown): target is null => target === null)

/**
 * Asserts that a value is null.
 * @param target The value to check.`
 * @param message The error message to throw if the value is not null.
 * @throws A TypeError with the given message if the value is not null.
 */
export const assertNull = createAssertion(isNull, 'Expected null')

/**
 * Ensures that a value is null.
 * @param target The value to check.
 * @param message The error message to throw if the value is not null.
 * @returns The value if it is null.
 * @throws A TypeError with the given message if the value is not null.
 */
export const ensureNull = createEnsure(assertNull)

/**
 * Checks if a value is not null.
 * @param target The value to check.
 * @returns True if the value is not null, false otherwise.
 */
export const isNotNull = not(isNull)

/**
 * Asserts that a value is not null.
 * @param target The value to check.
 * @param message The error message to throw if the value is null.
 * @throws A TypeError with the given message if the value is null.
 */
export const assertNotNull = createAssertion(isNotNull, 'Expected not null')

/**
 * Ensures that a value is not null.
 * @param target The value to check.
 * @param message The error message to throw if the value is null.
 * @returns The value if it is not null.
 * @throws A TypeError with the given message if the value is null.
 */
export const ensureNotNull = createEnsure(assertNotNull)
