---
title: object
description: A Type Guard Utility functions for checking if a value is an Object.
---
A Type Guard Utility functions for checking if a value is an Object.

## Example of return value

| input | result |
| ----- | ------ |
| Object <br> (e.g. `{ foo: 'bar' }`) | true |
| Array <br> (e.g. `['foo', 'bar']`) | false |
| Function <br> (e.g. `() => {}`) | false |
| null | false |
| undefined | false |
| other <br> (e.g. `0`, `''`, `false`, `true`) | false |

## Example of return types

| input | result |
| ----- | ------ |
| `object` | `object` |
| `unknown` | `Record<string, unknown>` |
| some type that satisfies `Record<string, unknown>` | same type |
| some instance | same type |
| some class instance | same type |
| other | `never` |

## isObject

A Type Guard function for checking if a value is an Object.

This determination is made by `target !== null && !Array.isArray(target) && typeof target === 'object'`.

### Basic Usage (isObject)

```typescript
function isObject(target: unknown): target is object
```

#### params

- `target` .. The value to check.

#### returns

- `true` .. When the value is an Object.
- `false` .. When the value is not an Object.

'Object' here means a value that is not null, not an Array, and has a type of 'object'.

### Example (isObject)


```typescript
import { isObject } from 'type-assurer'

const value: unknown = { foo: 'bar' }

if (isObject(value)) {
  // value is Record<string, unknown>
} else {
  // value is unknown
}

const value2 = { foo: 'bar' } as { foo: string } | string | null

if (isObject(value2)) {
  // value is { foo: string }
} else {
  // value is string | null
}

const value3 = { foo: 'bar' } as object | string

if (isObject(value3)) {
  // value is object
} else {
  // value is string
}
```

## assertObject

A Type Assertion function for checking if a value is an Object.

### Basic Usage (assertObject)

```typescript
function assertObject(target: unknown, errorMessage?: ErrorMessage): asserts target is object
```

#### params

- `target` .. The value to check.
- `errorMessage` .. (optional) The error message to be displayed when the value is not an Object.

#### returns

- `void` .. When the value is an Object.

Object here means a value that is not null, not an Array, and has a type of 'object'.

#### throws

- `TypeAssertionError` .. When the value is not an Object.

Object here means a value that is not null, not an Array, and has a type of 'object'.

### Example (assertObject)

```typescript
import { assertObject } from 'type-assurer'

const value: unknown = { foo: 'bar' }

assertObject(value)
// When the value is not an Object, TypeAssertionError is thrown.
// value is Record<string, unknown>

const value2 = { foo: 'bar' } as { foo: string } | string | null

assertObject(value2)
// When the value is not an Object, TypeAssertionError is thrown.
// value2 is { foo: string }

const value3 = { foo: 'bar' } as object | string

assertObject(value3)
// When the value is not an Object, TypeAssertionError is thrown.
// value3 is object
```

## ensureObject

Ensure that the value is an Object. If it is not an Object, throw an error.

### Basic Usage (ensureObject)

```typescript
function ensureObject(target: unknown, errorMessage?: ErrorMessage): object
```

#### params

- `target` .. The value to check.
- `errorMessage` .. (optional) The error message to be displayed when the value is not an Object.

#### returns

- `object` .. When the value is an Object.

Object here means a value that is not null, not an Array, and has a type of 'object'.

#### throws

- `TypeAssertionError` .. When the value is not an Object.

Object here means a value that is not null, not an Array, and has a type of 'object'.

### Example (ensureObject)

```typescript
import { ensureObject } from 'type-assurer'

function getObject(): unknown { return { foo: 'bar' } }

const result = ensureObject(getObject())
// When the value is not an Object, throw TypeAssertionError
// result is Record<string, unknown>

function getObject2(): { foo: string } | string { return { foo: 'bar' } }

const result2 = ensureObject(getObject2())
// When the value is not an Object, throw TypeAssertionError
// result2 is { foo: string }

function getObject3(): object | string { return { foo: 'bar' } }

const result3 = ensureObject(getObject3())
// When the value is not an Object, throw TypeAssertionError
// result3 is object
```

## fallbackObject

Fallback to the default value if the value is not an Object.

### Basic Usage (fallbackObject)

```typescript
function fallbackObject(target: unknown, defaultValue: object): object
```

#### params

- `target` .. The value to check.
- `defaultValue` .. The default value to be returned when the value is not an Object.

Object here means a value that is not null, not an Array, and has a type of 'object'.

#### returns

- `object` .. When the value is an Object. Or the default value when the value is not an Object.

### Example (fallbackObject)

```typescript
import { fallbackObject } from 'type-assurer'

function getObject(): unknown { return { foo: 'bar' } }

const result = fallbackObject(getObject(), { foo: 'baz' })
// When the value is not an Object, result is { foo: 'baz' }
// result is Record<string, unknown>

function getObject2(): { foo: string } | string { return { foo: 'bar' } }

const result2 = fallbackObject(getObject2(), { baz: 'qux' })
// When the value is not an Object, result2 is { foo: 'baz' }
// result2 is { foo: string } | { baz: string }

function getObject3(): object | string { return { foo: 'bar' } }

const result3 = fallbackObject(getObject3(), { baz: 'qux' })
// When the value is not an Object, result3 is { baz: 'qux' }
// result3 is object
```
