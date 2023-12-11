---
title: not-nil
description: A Type Guard Utility functions for checking if a value is not `null` and not `undefined`.
---
A Type Guard Utility functions for checking if a value is not `null` and not `undefined`.

:::note
`fallbackNotNil` is not implemented because it is not necessary. use `??` operator instead.
:::

## Example of return value

| input | result |
| ----- | ------ |
| `null` | false |
| `undefined` | false |
| other | true |

## isNotNil

A Type Guard function for checking if a value is not `null` and not `undefined`.

This function is determined by `target !== null && target !== undefined`.

### Basic Usage

```typescript
function isNotNil<T>(target: T): target is Exclude<T, null | undefined>
```

#### params

- `target` .. The value to check.

#### returns

- `true` .. When the value is not `null` and not `undefined`.
- `false` .. When the value is `null` or `undefined`.

### Examples

```typescript
import { isNotNil } from 'type-assurer'

const value: unknown = 0

if (isNotNil(value)) {
  // value is number
} else {
  // value is null or undefined
}
```

## assertNotNil

A Type Assertion function for checking if a value is not `null` and not `undefined`.

### Basic Usage

```typescript
function assertNotNil<T>(target: T): asserts target is Exclude<T, null | undefined>
```

#### params

- `target` .. The value to check.
- `message` .. (optional) The error message to be thrown when the value is `null` or `undefined`.

#### returns

- `void` .. When the value is not `null` and not `undefined`.

#### throws

- `TypeAssertionError` .. When the value is `null` or `undefined`.

### Examples

```typescript
import { assertNotNil } from 'type-assurer'

const value: unknown = 0

assertNotNil(value)
// When value is not null and not undefined, this function does not throw an error.
// value is {}
```

## ensureNotNil

Ensure that the value is not `null` and not `undefined`.

### Basic Usage

```typescript
function ensureNotNil<T>(target: T, message?: ErrorMessage): Exclude<T, null | undefined>
```

#### params

- `target` .. The value to check.
- `message` .. (optional) The error message to be thrown when the value is `null` or `undefined`.

#### returns

- `Exclude<T, null | undefined>` .. When the value is not `null` and not `undefined`.

#### throws

- `TypeAssertionError` .. When the value is `null` or `undefined`.

### Examples

```typescript
import { ensureNotNil } from 'type-assurer'

function getValue(): number | null { return null }

const value = ensureNotNil(getValue())
// When value is not null and not undefined, this function does not throw an error.
// value is number
```
