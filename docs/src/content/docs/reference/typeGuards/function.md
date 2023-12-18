---
title: function
description: A Type Guard Utility functions for checking if a value is a function.
---
A Type Guard Utility functions for checking if a value is a function.

## Example of return value

| input | result |
| ----- | ------ |
| function <br> (e.g. `() => {}`) | true |
| function object <br> (e.g. `new Function()`) | true |
| async function <br> (e.g. `async () => {}`) | true |
| async function object <br> (e.g. `new Function()`) | true |
| generator function <br> (e.g. `function* () {}`) | true |
| generator function object <br> (e.g. `new Function()`) | true |
| async generator function <br> (e.g. `async function* () {}`) | true |
| async generator function object <br> (e.g. `new Function()`) | true |
| constructor <br> (e.g. `class Foo {}`) | true |
| other <br> (e.g. `'foo'`, `null`, `undefined`, `{}`, `[]`) | false |

## isFunction

A Type Guard function for checking if a value is a function.

This function is determined by `typeof target === 'function'`.

### Basic Usage

```typescript
function isFunction(target: unknown): target is Function
```

#### params

- `target` .. The value to check.

#### returns

- `true` .. When the value is a function.
- `false` .. When the value is not a function.

### Examples

```typescript
import { isFunction } from 'type-assurer'

const value: unknown = () => {}

if (isFunction(value)) {
  // value is function
} else {
  // value is unknown
}
```

## assertFunction

A Type Assertion function for checking if a value is a function.

### Basic Usage

```typescript
function assertFunction(target: unknown, message?: ErrorMessage): asserts target is Function
```

#### params

- `target` .. The value to check.
- `message` .. (optional) The error message to be thrown when the value is not a function.

#### returns

- `void` .. When the value is a function.

#### throws

- `TypeAssertionError` .. When the value is not a function.

### Examples

```typescript
import { assertFunction } from 'type-assurer'

const value: unknown = () => {}

assertFunction(value)
// When the value is not a function, TypeAssertionError is thrown.
// value is function
```

## ensureFunction

Ensure that the value is a function.

### Basic Usage

```typescript
function ensureFunction(target: unknown, message?: ErrorMessage): Function
```

#### params

- `target` .. The value to check.
- `message` .. (optional) The error message to be thrown when the value is not a function.

#### returns

- `Function` .. When the value is a function.

### Examples

```typescript
import { ensureFunction } from 'type-assurer'

function getFunction() { return () => {} }

const result = ensureFunction(getFunction())
// When the value is not a function, TypeAssertionError is thrown.
// result is function
```

## fallbackFunction

Fallback to the fallback function if the value is not a function.

### Basic Usage

```typescript
function fallbackFunction(target: unknown, fallback: Function): Function
```

#### params

- `target` .. The value to check.
- `fallback` .. The fallback function.

#### returns

- `Function` .. When the value is a function.

### Examples

```typescript
import { fallbackFunction } from 'type-assurer'

function getFunction() { return () => 'foo' }

const result = fallbackFunction(getFunction(), () => 'bar')
// result is function
```
