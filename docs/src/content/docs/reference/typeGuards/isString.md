---
title: string
description: A Type Guard Utility functions for checking if a value is a string.
---
A Type Guard Utility functions for checking if a value is a string.

## List of inputs and results for them

| input | result |
| ----- | ------ |
| string <br> (e.g. `'foo'`) | true |
| empty string <br> (e.g. `''`) | true |
| string object <br> (e.g. `new String()`) | false |
| object including `Symbol.toPrimitive` <br> (e.g. `{ [Symbol.toPrimitive]: () => 'foo' }`) | false |
| object including `toString` <br> (e.g. `{ toString: () => 'foo' }`) | false |
| object including `valueOf` <br> (e.g. `{ valueOf: () => 'foo' }`) | false |
| other <br> (e.g. `0`, `null`, `undefined`, `{}`, `[]`) | false |

## isString

A Type Guard function for checking if a value is a string.

```typescript
function isString(target: unknown): target is string
```

### Basic Usage (isString)

```typescript
import { isString } from 'type-assurer'

const value: unknown = 'foo';

if (isString(value)) {
  // value is string
} else {
  // value is unknown
}

const value2: string | number = 'foo'

if (isString(value2)) {
  // value2 is string
} else {
  // value2 is number
}
```

## assertString

A Type Assertion function for checking if a value is a string.

```typescript
function assertString(target: unknown, errorMessage?: ErrorMessage): asserts target is string
```

### Basic Usage (assertString)

```typescript
import { assertString } from 'type-assurer'

const value: unknown = 'foo';

assertString(value)
// When value is not string, throw TypeAssertionError
// value is string

const value2: string | number = 'foo'

assertString(value2)
// When value2 is number, throw TypeAssertionError
// value2 is string
```

## ensureString

Ensure that the value is a string. If it is not a string, throw an error.

```typescript
function ensureString(target: unknown, errorMessage?: ErrorMessage): string
```

### Basic Usage (ensureString)

```typescript
import { ensureString } from 'type-assurer'

function getValue(): string { return 'foo' }

const result = ensureString(getValue())
// When result is not string, throw TypeAssertionError
// result is string

function getValue2(): 'foo' { return 'foo' }

const result2 = ensureString(getValue2())
// When result2 is not string, throw TypeAssertionError
// result2 is 'foo'
```

## fallbackString

Fallback to the default value if the value is not a string.

```typescript
function fallbackString(target: unknown, defaultValue: string): string
```

### Basic Usage (fallbackString)

```typescript
import { fallbackString } from 'type-assurer'

function getValue(): string { return 'foo' }

const result = fallbackString(getValue(), 'bar')
// When result is not string, result is 'bar'
// result is string

function getValue2(): 'foo' { return 'foo' }

const result2 = fallbackString(getValue2(), 'bar')
// When result2 is not string, result2 is 'bar'
// result2 is 'foo' | 'bar'
```
