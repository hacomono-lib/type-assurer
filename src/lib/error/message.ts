function actualTypeOf(target: unknown): string {
  const suffix = 'instead'
  if (typeof target !== 'object') {
    return `${typeof target} ${suffix}`
  }

  if (target === null) {
    return `null ${suffix}`
  }
  return `object (constructor: ${target.constructor?.name ?? 'object'}) ${suffix}`
}

export function errorMessage(expectedType: string, { not }: { not?: boolean } = {}): (target: unknown) => string {
  if (not) {
    return (actualValue) => {
      return `Expected a value not of type ${expectedType}, but received ${actualTypeOf(actualValue)}.`
    }
  }
  return (actualValue) => {
    return `Expected a ${expectedType}, but received ${actualTypeOf(actualValue)}.`
  }
}
