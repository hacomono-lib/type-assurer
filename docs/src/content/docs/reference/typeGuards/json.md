---
title: JSON
description: A Type Guard Utility functions for checking if a value is JSON like
---
A Type Guard Utility functions for checking if a value is JSON like.

"JSON like" means a value that can be converted to a JSON object string using `JSON.stringify` without missing object members, or a value that can be converted to a JSON primitive value.

:::note
If the value is an object, it checks whether the result of `JSON.parse(JSON.stringify(value))` is exactly the same as the original object.

If the object has a method, it will not be included in the result of `JSON.stringify`, so it will not match exactly.

However, [WellKnown Symbols](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbol) are not included in the result of JSON.stringify and are not referenced, so they are not included in this check.

Also, if there is a [toJSON](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#tojson_%E3%81%AE%E6%8C%99%E5%8B%95) method at the root, it checks the result of that method.

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

## isJSON

A Type Guard function for checking if a value is a JSON like.

### Basic Usage

```typescript
function isJSON(target: unknown): target is JSON
```

#### params

- `target` .. The value to check.

#### returns

- `true` .. When the value is a JSON.
- `false` .. When the value is not a JSON.

### Examples

```typescript
import { isJSON } from 'type-assurer'

const value = { foo: 'bar' }

if (isJSON(value)) {
  // value is { foo: string }
} else {
  // value is never
}

const value2 = { foo: () => 'bar' }

if (isJSON(value2)) {
  // value2 is never
} else {
  // value2 is { foo: () => string }
}

const value3 = { foo: 'bar' } as unknown

if (isJSON(value3)) {
  // value3 is JSON
} else {
  // value3 is unknown
}
```

## assertJSON

A Type Assertion function for checking if a value is a JSON.

### Basic Usage

```typescript
function assertJSON(target: unknown, message?: TypeErrorMessage): asserts target is JSON
```

#### params

- `target` .. The value to check.
- `message` .. (optional) The error message to be displayed when the assertion fails.

#### returns

- `void` .. When the value is a JSON.

#### throws

- `TypeAssertionError` .. When the value is not a JSON.

### Examples

```typescript
import { assertJSON } from 'type-assurer'

const value = { foo: 'bar' }

assertJSON(value)
// When the value is not a JSON, TypeAssertionError is thrown.
// value is { foo: string }

const value2 = { foo: () => 'bar' }

assertJSON(value2)
// When the value is not a JSON, TypeAssertionError is thrown.
// value2 is never

const value3 = { foo: 'bar' } as unknown

assertJSON(value3)
// When the value is not a JSON, TypeAssertionError is thrown.
// value3 is JSON
```

### ensureJSON

Ensures that the value is a JSON. If it is not a JSON, an error is thrown.

### Basic Usage

```typescript
function ensureJSON(target: unknown, message?: TypeErrorMessage): JSON
```

#### params

- `target` .. The value to check.
- `message` .. (optional) The error message to be displayed when the assertion fails.

#### returns

- `JSON` .. When the value is a JSON.

#### throws

- `TypeAssertionError` .. When the value is not a JSON.

### Examples

```typescript
import { ensureJSON } from 'type-assurer'

function getValue() { return { foo: 'bar' } }

const value = ensureJSON(getValue())
// When the value is not a JSON, TypeAssertionError is thrown.
// value is { foo: string }

function getValue2() { return { foo: () => 'bar' } }

const value2 = ensureJSON(getValue2())
// When the value is not a JSON, TypeAssertionError is thrown.
// value2 is never

function getValue3() { return { foo: 'bar' } as unknown }

const value3 = ensureJSON(getValue3())
// When the value is not a JSON, TypeAssertionError is thrown.
// value3 is JSON
```

## fallbackJSON

Fallback to the default value if the value is not a JSON.

### Basic Usage

```typescript
function fallbackJSON(target: unknown, fallback: JSON): Jsonifiable
```

#### params

- `target` .. The value to check.
- `fallback` .. The default value to return if the value is not a JSON.

#### returns

- `JSON` .. When the value is a JSON. Otherwise, the fallback value.

### Examples

```typescript
import { fallbackJSON } from 'type-assurer'

function getValue() { return { foo: 'bar' } }

const value = fallbackJSON(getValue(), { baz: 'qux' })
// When the value is not a JSON, the process continues.
// value is { foo: string } | { baz: string }

function getValue2() { return { foo: () => 'bar' } }

const value2 = fallbackJSON(getValue2(), { baz: 'qux' })
// When the value is not a JSON, the process continues.
// value2 is { baz: string }

function getValue3() { return { foo: 'bar' } as unknown }

const value3 = fallbackJSON(getValue3(), { baz: 'qux' })
// When the value is not a JSON, the process continues.
// vlaue3 is JSON | { baz: string }
```
