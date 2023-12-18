---
title: JSON-parsable
description: Type Guards and Type Assertions for JSON-parsable.
---

A Type Guard and Type Assertion functions for checking if a value is a JSON-parsable.

"JSON-parsable" means that the value is a JSON or JSON parsable string using `JSON.parse()`.

## Example of return value

| input | example input | result | parsed result |
| ----- | -------------- | ------ | ------------- |
| number string | `'0'` | true | `0` |
| ^ | `'0123'` | true | `123` |
| ^ | `'1.1'` | true | `1.1` |
| ^ | `'Infinity'` | false | no result |
| boolean string | `'true'` | true | `true` |
| ^ | `'false'` | true | `false` |
| null string | `'null'` | true | `null` |
| json-object string | `'{}'` | true | `{}` |
| ^ | `'{"foo":"bar"}'` | true | `{ foo: 'bar' }` |
| ^ | `'{"foo":undefined}'` | false | no result |
| ^ | `'{"foo":() => 'bar'}'` | false | no result |
| ^ | `'[1, 2, 3]'` | true | `[1, 2, 3]` |

## isJSONParsable

A Type Guard function for checking if a value is a JSON-parsable.

### Basic Usage

```typescript
function isJSONParsable(target: unknown): target is JSONParsable
```

#### params

- `target` .. The value to check.

#### returns

- `true` .. When the value is a JSON-parsable.
- `false` .. When the value is not a JSON-parsable.

### Examples

```typescript
import { isJSONParsable } from 'type-assurer'

const value = '{"foo":"bar"}'
if (isJSONParsable(value)) {
  // this is true, value is JSONParsable
}
```

## assertJSONParsable

A Type Assertion function for checking if a value is a JSON-parsable.

### Basic Usage

```typescript
function assertJSONParsable(target: unknown, message?: ErrorMessage): asserts target is JSONParsable
```

#### params

- `target` .. The value to check.
- `message` .. The error message to throw when the value is not a JSON-parsable.

#### returns

- `void` .. When the value is a JSON-parsable.

#### throws

- `TypeAssertionError` .. When the value is not a JSON-parsable.

### Examples

```typescript
import { assertJSONParsable } from 'type-assurer'

const value = '{"foo":"bar"}'
assertJSONParsable(value)
// When the value is not a JSON-parsable, TypeAssertionError is thrown.
// value is JSONParsable
```

## ensureJSONParsable

Ensure that the value is a JSON-parsable.

### Basic Usage

```typescript
function ensureJSONParsable(target: unknown, message?: ErrorMessage): JSONParsable
```

#### params

- `target` .. The value to check.
- `message` .. The error message to throw when the value is not a JSON-parsable.

#### returns

- `JSONParsable` .. When the value is a JSON-parsable.

#### throws

- `TypeAssertionError` .. When the value is not a JSON-parsable.

### Examples

```typescript
import { ensureJSONParsable } from 'type-assurer'

function getValue() { return '{"foo":"bar"}' }

const value = ensureJSONParsable(getValue())
// When the value is not a JSON-parsable, TypeAssertionError is thrown.
// value is JSONParsable
```

## fallbackJSONParsable

Fallback to the default value if the value is not a JSON-parsable.

### Basic Usage

```typescript
function fallbackJSONParsable(target: unknown, fallback: JSONParsable): JSONParsable
```

#### params

- `target` .. The value to check.
- `fallback` .. The default value to return if the value is not a JSON-parsable.

#### returns

- `JSONParsable` .. When the value is a JSON-parsable. Otherwise, the fallback value.

### Examples

```typescript
import { fallbackJSONParsable } from 'type-assurer'

function getValue() { return '{"foo":"bar"}' }

const value = fallbackJSONParsable(getValue(), { baz: 'qux' })
// When the value is not a JSON-parsable, value is { baz: 'qux' }
```

## coerceJSON

Coerce the value to a JSON if it is a JSON like object or JSON parsable string.
Otherwise, throw an error.

If the value is a string, check with `isJSONParsable` and return the result of `JSON.parse`.
If the value is not a string, check with `isJSON` and return the same value if it is true.

### Basic Usage

```typescript
function coerceJSON(target: unknown, message?: ErrorMessage): JSON
```

#### params

- `target` .. The value to coerce to a JSON.
- `message` .. The error message to throw when the value is not a JSON.

#### returns

- `JSON` .. When the value is a JSON.

#### throws

- `TypeAssertionError` .. When the value cannot be coerced to a JSON.

### Examples

```typescript
import { coerceJSON } from 'type-assurer'

function getValue() { return '{"foo":"bar"}' }

const value = coerceJSON(getValue())
// value is { foo: 'bar' }

function getValue2() { return { foo: 'bar' } }

const value2 = coerceJSON(getValue2())
// value2 is { foo: 'bar' }
```

## fixJSON

Fix the value to a JSON if it is a JSON like object or JSON parsable string.
Otherwise, return the default value.

If the value is a string, check with `isJSONParsable` and return the result of `JSON.parse`.
If the value is not a string, check with `isJSON` and return the same value if it is true.

### Basic Usage

```typescript
function fixJSON(target: unknown, fallback: JSON): JSON
```

#### params

- `target` .. The value to fix to a JSON.
- `fallback` .. The default value to return if the value is not a JSON.

#### returns

- `JSON` .. When the value is a JSON. Otherwise, the fallback value.

### Examples

```typescript
import { fixJSON } from 'type-assurer'

function getValue() { return '{"foo":"bar"}' }

const value = fixJSON(getValue(), {})
// value is { foo: 'bar' }

function getValue2() { return { foo: 'bar' } }

const value2 = fixJSON(getValue2(), {})
// value2 is { foo: 'bar' }

function getValue3() { return 'foo' }

const value3 = fixJSON(getValue3(), {})
// value3 is {}
```
