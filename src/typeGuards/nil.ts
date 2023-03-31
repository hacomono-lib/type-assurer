import { createAssertion, createEnsure, createGuard, not } from "../factory"
import { isNull } from "./null"
import { isUndefined } from "./undefined"

/**
 * Checks if a value is null or undefined.
 * @param target The value to check.
 * @returns True if the value is null or undefined, false otherwise.
 */
export const isNil = createGuard((target: unknown): target is null | undefined => isNull(target) || isUndefined(target))

/**
 * Asserts that a value is null or undefined.
 * @param target The value to check.`
 * @param message The error message to throw if the value is not null or undefined.
 * @throws A TypeError with the given message if the value is not null or undefined.
 */
export const assertNil = createAssertion(isNil, "Expected nil")

/**
 * Ensures that a value is null or undefined.
 * @param target The value to check.
 * @param message The error message to throw if the value is not null or undefined.
 * @returns The value if it is null or undefined.
 * @throws A TypeError with the given message if the value is not null or undefined.
 */
export const ensureNil = createEnsure(assertNil)

/**
 * Checks if a value is not null or undefined.
 * @param target The value to check.
 * @returns True if the value is not null or undefined, false otherwise.
 */
export const isNotNil = not(isNil)

/**
 * Asserts that a value is not null or undefined.
 * @param target The value to check.
 * @param message The error message to throw if the value is null or undefined.
 * @throws A TypeError with the given message if the value is null or undefined.
 */
export const assertNotNil = createAssertion(isNotNil, "Expected not nil")

/**
 * Ensures that a value is not null or undefined.
 * @param target The value to check.
 * @param message The error message to throw if the value is null or undefined.
 * @returns The value if it is not null or undefined.
 * @throws A TypeError with the given message if the value is null or undefined.
 */
export const ensureNotNil = createEnsure(assertNotNil)




