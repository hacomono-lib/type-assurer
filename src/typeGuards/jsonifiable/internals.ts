import { isObject } from '../object'
import { isArray } from '../array'

export function hasToJSON(value: unknown): value is { toJSON: (key: string | number) => unknown } {
  return isObject(value) && typeof (value as { toJSON: unknown }).toJSON === 'function'
}

function getValueByObject(key: string | number, target: unknown): unknown {
  if (hasToJSON(target)) {
    return target.toJSON(key)
  }

  if (!isObject(target)) {
    return target
  }

  const value = target.valueOf()
  if (target !== value) {
    return value
  }

  return target
}

export function deepJsonEqual(cloned: unknown, target: unknown): boolean {
  if (cloned === target) {
    return true
  }

  if (typeof cloned !== typeof target) {
    return false
  }

  if (isObject(cloned) && isObject(target)) {
    const aKeys = Object.keys(cloned)
    const bKeys = Object.keys(target)

    if (aKeys.length !== bKeys.length) {
      return false
    }

    const keys = Array.from(new Set([...aKeys, ...bKeys]))

    return keys.every((key) =>
      deepJsonEqual(getValueByObject(key, cloned), getValueByObject(key, target))
    )
  }

  if (isArray(cloned) && isArray(target)) {
    if (cloned.length !== target.length) {
      return false
    }

    return cloned.every((c, index) =>
      deepJsonEqual(getValueByObject(index, c), getValueByObject(index, target[index]))
    )
  }

  return false
}
