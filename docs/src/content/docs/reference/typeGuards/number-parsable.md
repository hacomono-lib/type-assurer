---
title: number-parsable
describe: A Type Guard Utility functions for checking if a value is a NumberParsable.
---
A Type Guard Utility functions for checking if a value is a NumberParsable.

"NumberParsable" is a value that can be converted to a number, using `Number(value)`.

## Example of return value

| input | example input | result | parsed result |
| ----- | -------------- | ------ | ------------- |
| number | `0` | true | `0` |
| ^ | `1` | true | `1` |
| ^ | `1.1` | true | `1.1` |
| ^ | `Infinity` | true | `Infinity` |
| ^ | `-Infinity` | true | `-Infinity` |
| NaN | `NaN` | false | no result |
| number object | `new Number(1)` | true | `1` |
| boolean | `true` | true | `1` |
| ^ | `false` | true | `0` |
| boolean object | `new Boolean(true)` | true | same as input of `Boolean` constructor argument |
| null | `null` | true | `0` |
| undefined | `undefined` | false | no result |
| string number | `'0'` | true | `0` |
| ^ | `'0123'` | true | `123` |
| ^ | `'1.1'` | true | `1.1` |
| ^ | `'Infinity'` | true | `Infinity` |
| string bigint | `'0n'` | false | no result |
| string | `'foo'` | false | no result |
| object with 'valueOf' | `new Number(1)` | true | `1` |
| ^ | `{ valueOf: () => 1 }` | true | `1` |
| ^ | `{ valueOf: () => true }` | true | `1` |
| ^ | `{ valueOf: () => 'foo' }` | false | no result |
| object with '[Symbol.toPrimitive]' | `{ [Symbol.toPrimitive]: () => 1 }` | true | `1` |
| ^ | `{ [Symbol.toPrimitive]: () => true }` | true | `1` |
| ^ | `{ [Symbol.toPrimitive]: () => 'foo' }` | false | no result |
| other | `''`, `false`, `true`, `null`, `undefined` | false | no result |

:::note
Returns false for cases where `Number(value)` would cause an error, such as Symbol.
:::

## isNumberParsable

A Type Guard function for checking if a value is a NumberParsable.

### Basic Usage

```typescript
function isNumberParsable(target: unknown): target is NumberParsable
```

#### params

- `target` .. The value to check.

#### returns

- `true` .. When the value is a NumberParsable.
- `false` .. When the value is not a NumberParsable.

### Examples

```typescript
import { isNumberParsable } from 'type-assurer'

const value: unknown = '123'

if (isNumberParsable(value)) {
  // value is NumberParsable
} else {
  // value is unknown
}

const value2 = '123' as '123' | 'foo'

if (isNumberParsable(value2)) {
  // value2 is '123'
} else {
  // value2 is 'foo'
}
```

## assertNumberParsable

A Type Assertion function for checking if a value is a NumberParsable.

### Basic Usage

```typescript
function assertNumberParsable(target: unknown, message?: ErrorMessage): asserts target is NumberParsable
```

#### params

- `target` .. The value to check.
- `message` .. (optional) The error message to be displayed when the assertion fails.

#### returns

- `void` .. When the value is a NumberParsable.

#### throws

- `TypeAssertionError` .. When the value is not a NumberParsable.

### Examples

```typescript
import { assertNumberParsable } from 'type-assurer'

const value: unknown = '123'

assertNumberParsable(value)
// When the value is NumberParsable, the process continues.
// value is NumberParsable

const value2 = '123' as '123' | 'foo'

assertNumberParsable(value2)
// When the value is NumberParsable, the process continues.
// value2 is '123'
```

## ensureNumberParsable

Ensures that the value is a NumberParsable. If not, throw an error.

### Basic Usage

```typescript
function ensureNumberParsable(target: unknown, message?: ErrorMessage): NumberParsable
```

#### params

- `target` .. The value to check.
- `message` .. (optional) The error message to be displayed when the assertion fails.

#### returns

- `NumberParsable` .. When the value is a NumberParsable.

#### throws

- `TypeAssertionError` .. When the value is not a NumberParsable.

### Examples

```typescript
import { ensureNumberParsable } from 'type-assurer'

function getValue(): unknown { return '123' }

const value = ensureNumberParsable(getValue())
// When the value is NumberParsable, the process continues.
// value is NumberParsable

function getValue2(): '123' | 'foo' { return '123' }

const value2 = ensureNumberParsable(getValue2())
// When the value is NumberParsable, the process continues.
// value2 is '123'
```

## fallbackNumberParsable

Fallback to the default value if the value is not a NumberParsable.

### Basic Usage

```typescript
function fallbackNumberParsable(target: unknown, fallbackValue: NumberParsable): NumberParsable
```

#### params

- `target` .. The value to check.
- `fallbackValue` .. The default value to be returned when the value is not a NumberParsable.

#### returns

- `NumberParsable` .. When the value is a NumberParsable. Otherwise, the fallback value.
  
### Examples

```typescript
import { fallbackNumberParsable } from 'type-assurer'

function getValue(): unknown { return '123' }

const value = fallbackNumberParsable(getValue(), 0)
// When the value is NumberParsable, the process continues.
// value is NumberParsable

function getValue2(): '123' | 'foo' { return '123' }

const value2 = fallbackNumberParsable(getValue2(), 0)
// When the value is NumberParsable, the process continues.
// value2 is '123' | 0
```

## coerceNumber

Parse the value as a number. If it fails, throw an error.

### Basic Usage

```typescript
function coerceNumber(target: unknown, message?: ErrorMessage): number
```

#### params

- `target` .. The value to parse.
- `message` .. (optional) The error message to be displayed when the parsing fails.

#### returns

- `number` .. When the value is a NumberParsable.

#### throws

- `TypeAssertionError` .. When the value is not a NumberParsable.

### Examples

```typescript
import { coerceNumber } from 'type-assurer'

function getValue(): unknown { return '123' }

const value = coerceNumber(getValue())
// When the value is NumberParsable, the process continues.
// value is number

function getValue2(): '123' | 456 | 'foo' | 'bar' { return '123' }

const value2 = coerceNumber(getValue2())
// When the value is NumberParsable, the process continues.
// value2 is 123 | 456
```

## fixNumber

Parse the value as a number. If it fails, return the fallback value.

### Basic Usage

```typescript
function fixNumber(target: unknown, fallbackValue: number): number
```

#### params

- `target` .. The value to parse.
- `fallbackValue` .. The default value to be returned when the parsing fails.

#### returns

- `number` .. When the value is a NumberParsable. Otherwise, the fallback value.

### Examples

```typescript
import { fixNumber } from 'type-assurer'

function getValue(): unknown { return '123' }

const value = fixNumber(getValue(), 0)
// When the value is NumberParsable, the process continues.
// value is number

function getValue2(): '123' | 456 | 'foo' | 'bar' { return '123' }

const value2 = fixNumber(getValue2(), 789)
// When the value is NumberParsable, the process continues.
// value2 is 123 | 456 | 789
```
