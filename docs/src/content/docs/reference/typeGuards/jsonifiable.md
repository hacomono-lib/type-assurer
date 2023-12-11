---
title: jsonifiable
description: A Type Guard Utility functions for checking if a value is Jsonifiable.
---
A Type Guard Utility functions for checking if a value is Jsonifiable.

"Jsonifiable" is a value that can be converted to a JSON string, using `JSON.stringify(value)` without causing member omissions.

:::note
If the value is an object, it checks whether the result of `JSON.parse(JSON.stringify(value))` is exactly the same as the original object.

If the object has a method, it will not be included in the result of `JSON.stringify`, so it will not match exactly.

However, WellKnown Symbols are not included in the result of JSON.stringify and are not referenced, so they are not included in this check.

Also, if there is a toJSON method at the root, it checks the result of that method.

e.g.

```typescript
const sample1 = {
  foo: 'bar',
}
// this is true

const sample2 = {
  foo: 'bar',
  // methods are not included in the result of JSON.stringify,
  // so returns false
  baz() { return 'qux' }
}
// this is false

const sample3 = {
  foo: 'bar',
  // if there is a toJSON method at the root,
  // it checks the result of that method
  toJSON() { return 'baz' }
}
// this is true

const sample4 = {
  foo: 'bar',
  // WellKnown Symbols are not included in the result of JSON.stringify
  // and are not referenced, so they are not included in this check
  [Symbol.toPrimitive]() { return 'baz' },
}
// this is true
```

:::

## Example of return value

| input | example input | result |
| ----- | -------------- | ------ |
| boolean | `true` | true |
| ^ | `false` | true |
| number | `0` | true |
| ^ | `1` | true |
| ^ | `1.1` | true |
| not-finite number | `Infinity` | false |
| ^ | `-Infinity` | false |
| ^ | `NaN` | false |
| string | `'foo'` | false |
| null | `null` | true |
| undefined | `undefined` | false |
| symbol | `Symbol('foo')` | false |
| bigint | `0n` | false |
| object | `{}` | true |
| ^ | `{ foo: 'bar' }` | true |
| ^ | `{ foo: undefined }` | false |
| ^ | `{ foo: () => 'bar' }` | false |
| object with `valueOf` | `{ valueOf: () => ({ foo: 'bar' }) }` | true |
| object with `toJSON` | `{ toJSON: () => 'bar' }` | true |
| object with `[Symbol.toPrimitive]` | `{ [Symbol.toPrimitive]: () => true }` | true |
| array | `[]` | true |
| ^ | `[1, 2, 3]` | true |
| Date | `new Date()` | true |

## isJsonifiable

A Type Guard function for checking if a value is a Jsonifiable.

### Basic Usage

```typescript
function isJsonifiable(target: unknown): target is Jsonifiable
```

#### params

- `target` .. The value to check.

#### returns

- `true` .. When the value is a Jsonifiable.
- `false` .. When the value is not a Jsonifiable.

### Examples

```typescript
import { isJsonifiable } from 'type-assurer'

const value = { foo: 'bar' }

if (isJsonifiable(value)) {
  // value is { foo: string }
} else {
  // value is never
}

const value2 = { foo: () => 'bar' }

if (isJsonifiable(value2)) {
  // value2 is never
} else {
  // value2 is { foo: () => string }
}

const value3 = { foo: 'bar' } as unknown

if (isJsonifiable(value3)) {
  // value3 is Jsonifiable
} else {
  // value3 is unknown
}
```

## assertJsonifiable

A Type Assertion function for checking if a value is a Jsonifiable.

### Basic Usage

```typescript
function assertJsonifiable(target: unknown, message?: TypeErrorMessage): asserts target is Jsonifiable
```

#### params

- `target` .. The value to check.
- `message` .. (optional) The error message to be displayed when the assertion fails.

#### returns

- `void` .. When the value is a Jsonifiable.

#### throws

- `TypeAssertionError` .. When the value is not a Jsonifiable.

### Examples

```typescript
import { assertJsonifiable } from 'type-assurer'

const value = { foo: 'bar' }

assertJsonifiable(value)
// When the value is not a Jsonifiable, TypeAssertionError is thrown.
// value is { foo: string }

const value2 = { foo: () => 'bar' }

assertJsonifiable(value2)
// When the value is not a Jsonifiable, TypeAssertionError is thrown.
// value2 is never

const value3 = { foo: 'bar' } as unknown

assertJsonifiable(value3)
// When the value is not a Jsonifiable, TypeAssertionError is thrown.
// value3 is Jsonifiable
```

### ensureJsonifiable

Ensures that the value is a Jsonifiable. If it is not a Jsonifiable, an error is thrown.

### Basic Usage

```typescript
function ensureJsonifiable(target: unknown, message?: TypeErrorMessage): Jsonifiable
```

#### params

- `target` .. The value to check.
- `message` .. (optional) The error message to be displayed when the assertion fails.

#### returns

- `Jsonifiable` .. When the value is a Jsonifiable.

#### throws

- `TypeAssertionError` .. When the value is not a Jsonifiable.

### Examples

```typescript
import { ensureJsonifiable } from 'type-assurer'

function getValue() { return { foo: 'bar' } }

const value = ensureJsonifiable(getValue())
// When the value is not a Jsonifiable, TypeAssertionError is thrown.
// value is { foo: string }

function getValue2() { return { foo: () => 'bar' } }

const value2 = ensureJsonifiable(getValue2())
// When the value is not a Jsonifiable, TypeAssertionError is thrown.
// value2 is never

function getValue3() { return { foo: 'bar' } as unknown }

const value3 = ensureJsonifiable(getValue3())
// When the value is not a Jsonifiable, TypeAssertionError is thrown.
// value3 is Jsonifiable
```

## fallbackJsonifiable

Fallback to the default value if the value is not a Jsonifiable.

### Basic Usage

```typescript
function fallbackJsonifiable(target: unknown, fallback: Jsonifiable): Jsonifiable
```

#### params

- `target` .. The value to check.
- `fallback` .. The default value to return if the value is not a Jsonifiable.

#### returns

- `Jsonifiable` .. When the value is a Jsonifiable. Otherwise, the fallback value.

### Examples

```typescript
import { fallbackJsonifiable } from 'type-assurer'

function getValue() { return { foo: 'bar' } }

const value = fallbackJsonifiable(getValue(), { baz: 'qux' })
// When the value is not a Jsonifiable, the process continues.
// value is { foo: string } | { baz: string }

function getValue2() { return { foo: () => 'bar' } }

const value2 = fallbackJsonifiable(getValue2(), { baz: 'qux' })
// When the value is not a Jsonifiable, the process continues.
// value2 is { baz: string }

function getValue3() { return { foo: 'bar' } as unknown }

const value3 = fallbackJsonifiable(getValue3(), { baz: 'qux' })
// When the value is not a Jsonifiable, the process continues.
// vlaue3 is Jsonifiable | { baz: string }
```
