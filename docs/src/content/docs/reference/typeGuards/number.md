---
title: number
description: A Type Guard Utility functions for checking if a value is a number.
---
A Type Guard Utility functions for checking if a value is a number.

:::note
`NaN` is a type of number, but it is judged as false because it is not a number.
:::

## Example of return value

| input | result |
| ----- | ------ |
| number <br> (e.g. `0`) | true |
| Non-finite number without `NaN` <br> (e.g. `Infinity`, `-Infinity`) | true |
| NaN | false |
| number object <br> (e.g. `new Number()`) | false |
| BigInt <br> (e.g. `0n`) | false |
| object including `Symbol.toPrimitive` <br> (e.g. `{ [Symbol.toPrimitive]: () => 0 }`) | false |
| object including `valueOf` <br> (e.g. `{ valueOf: () => 0 }`) | false |
| other <br> (e.g. `'foo'`, `null`, `undefined`, `{}`, `[]`) | false |

## isNumber

A Type Guard function for checking if a value is a number.

This function is determined by `typeof target === 'number' && !isNaN(target)`.

### Basic Usage

```typescript
function isNumber(target: unknown): target is number
```

#### params

- `target` .. The value to check.

#### returns

- `true` .. When the value is a number.
- `false` .. When the value is not a number. (including `NaN`)

### Examples

```typescript
import { isNumber } from 'type-assurer'

const value: unknown = 0

if (isNumber(value)) {
  // value is number
} else {
  // value is unknown
}
```

## assertNumber

A Type Assertion function for checking if a value is a number.

### Basic Usage

```typescript
function assertNumber(target: unknown, message?: ErrorMessage): asserts target is number
```

#### params

- `target` .. The value to check.
- `message` .. (optional) The error message to be thrown when the value is not a number.

#### returns

- `void` .. When the value is a number.

#### throws

- `TypeAssertionError` .. When the value is not a number.

### Examples

```typescript
import { assertNumber } from 'type-assurer'

const value: unknown = 0

assertNumber(value)
// When the value is not a number, TypeAssertionError is thrown.
// value is number
```

## ensureNumber

Ensure that the value is a number. If it is not a number, it will be converted to a number.

### Basic Usage

```typescript
function ensureNumber(target: unknown, message?: ErrorMessage): number
```

#### params

- `target` .. The value to check.
- `message` .. (optional) The error message to be thrown when the value is not a number.

#### returns

- `number` .. When the value is a number.

#### throws

- `TypeAssertionError` .. When the value is not a number.

### Examples

```typescript
import { ensureNumber } from 'type-assurer'

function getValue(): unknown { return '0' }

const value: number = ensureNumber(getValue())
// When the value is not a number, TypeAssertionError is thrown.
// value is number
```

## fallbackNumber

Fallback to the default value if the value is not a number.

### Basic Usage

```typescript
function fallbackNumber(target: unknown, fallbackValue: number): number
```

#### params

- `target` .. The value to check.
- `fallbackValue` .. The default value to be returned when the value is not a number.

#### returns

- `number` .. When the value is a number. If the value is not a number, the default value is returned.

### Examples

```typescript
import { fallbackNumber } from 'type-assurer'

function getValue(): unknown { return '0' }

const value: number = fallbackNumber(getValue(), 1)
// When the value is not a number, 1 is returned.
// value is number
```
