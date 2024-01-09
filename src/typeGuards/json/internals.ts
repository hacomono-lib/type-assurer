import { isArray } from '~/typeGuards/array'
import { isBoolean } from '~/typeGuards/boolean'
import { isNumber } from '~/typeGuards/number'
import { isObject } from '~/typeGuards/object'
import { isString } from '~/typeGuards/string'

export function hasToJson(value: unknown): value is { toJson: (key: string | number | symbol) => unknown } {
  return isObject(value) && typeof (value as { toJson: unknown }).toJson === 'function'
}

function getValueByObject(key: string | number | symbol, target: unknown): unknown {
  if (isJsonPrimitive(target) || target === undefined) {
    return target
  }

  if (hasToJson(target)) {
    return target.toJson(key)
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  if ('valueof' in (target as any)) {
    return target
  }

  const value = (target as object).valueOf()
  if (target !== value) {
    return value
  }

  return target
}

export function deepJsonEqual(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true
  }

  if (typeof a !== typeof b) {
    return false
  }

  if (isObject(a) && isObject(b)) {
    return objectEquals(a, b)
  }

  if (isArray(a) && isArray(b)) {
    return arrayEquals(a, b)
  }

  return false
}

function getKeys(a: Record<string, unknown>): Array<string | number | symbol> {
  if (a.constructor && Object !== a.constructor) {
    return Reflect.ownKeys(a.constructor.prototype)
  }

  return Object.keys(a)
}

function objectEquals(
  a: Record<string | number | symbol, unknown>,
  b: Record<string | number | symbol, unknown>,
): boolean {
  const aKeys = getKeys(a)
  const bKeys = getKeys(b)
  const keys = Array.from(new Set([...aKeys, ...bKeys]))

  if (keys.length !== aKeys.length || keys.length !== bKeys.length) {
    return false
  }

  let result = true
  for (const key of keys) {
    result &&= deepJsonEqual(getValueByObject(key, a[key]), getValueByObject(key, b[key]))
  }
  return result
}

function arrayEquals(a: unknown[], b: unknown[]): boolean {
  if (a.length !== b.length) {
    return false
  }

  let result = true
  for (let index = 0; index < a.length; index++) {
    result &&= deepJsonEqual(getValueByObject(index, a[index]), getValueByObject(index, b[index]))
  }
  return result
}

export function isJsonPrimitive(target: unknown): target is number | string | boolean | null {
  return isNumber(target) || isString(target) || isBoolean(target) || target === null
}
