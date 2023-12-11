---
title: symbol
description: A Type Guard Utility functions for checking if a value is a symbol.
---
A Type Guard Utility functions for checking if a value is a symbol.

## Example of return value

| input | result |
| ----- | ------ |
| symbol <br> (e.g. `Symbol('foo')`) | true |
| other <br> (e.g. `0`, `null`, `undefined`, `{}`, `[]`) | false |

## isSymbol

A Type Guard function for checking if a value is a symbol.

This function is determined by `typeof target === 'symbol'`.

### Basic Usage

```typescript
function isSymbol(target: unknown): target is symbol
```

#### params

- `target` .. The value to check.

#### returns

- `true` .. When the value is a symbol.
- `false` .. When the value is not a symbol.

### Examples

```typescript
import { isSymbol } from 'type-assurer'

const value: unknown = Symbol('foo')

if (isSymbol(value)) {
  // value is symbol
} else {
  // value is unknown
}

const symbol1: unique symbol = Symbol('bar')
const symbol2: unique symbol = Symbol('baz')
const value2: typeof symbol1 | typeof symbol2 | undefined = symbol1

if (isSymbol(value2)) {
  // value2 is typeof symbol1 | typeof symbol2
} else {
  // value2 is undefined
}
```

## assertSymbol

A Type Guard function for checking if a value is a symbol.

### Basic Usage

```typescript
function assertSymbol(target: unknown, message?: ErrorMessage): asserts target is symbol
```

#### params

- `target` .. The value to check.
- `message` .. (optional) The error message to be displayed when the value is not a symbol.

#### returns

- `void` .. When the value is a symbol.

#### throws

- `TypeAssertionError` .. When the value is not a symbol.

### Examples

```typescript
import { assertSymbol } from 'type-assurer'

const value: unknown = Symbol('foo')

assertSymbol(value)
// When the value is not a symbol, TypeAssertionError is thrown.
// value is symbol

const symbol1: unique symbol = Symbol('bar')
const symbol2: unique symbol = Symbol('baz')
const value2: typeof symbol1 | typeof symbol2 | undefined = symbol1

assertSymbol(value2)
// When the value is not a symbol, TypeAssertionError is thrown.
// value2 is typeof symbol1 | typeof symbol2
```

## ensureSymbol

Ensure that the value is a symbol.

### Basic Usage

```typescript
function ensureSymbol(target: unknown, message?: ErrorMessage): symbol
```

#### params

- `target` .. The value to check.
- `message` .. (optional) The error message to be displayed when the value is not a symbol.

#### returns

- `symbol` .. When the value is a symbol.

#### throws

- `TypeAssertionError` .. When the value is not a symbol.

### Examples

```typescript
import { ensureSymbol } from 'type-assurer'

function getValue(): unknown { return Symbol('foo') }

const value = ensureSymbol(getValue())
// When the value is not a symbol, TypeAssertionError is thrown.
// value is symbol

const symbol1: unique symbol = Symbol('bar')
const symbol2: unique symbol = Symbol('baz')
function getValue2(): typeof symbol1 | typeof symbol2 | undefined { return symbol1 }

const value2 = ensureSymbol(getValue2())
// When the value is not a symbol, TypeAssertionError is thrown.
// value2 is typeof symbol1 | typeof symbol2
```

## fallbackSymbol

A Type Guard function for checking if a value is a symbol.

### Basic Usage

```typescript
function fallbackSymbol(target: unknown, fallbackValue: symbol): symbol
```

#### params

- `target` .. The value to check.
- `fallbackValue` .. The value to return when the value is not a symbol.

#### returns

- `symbol` .. When the value is a symbol. If the value is not a symbol, return the fallback value.

### Examples

```typescript
import { fallbackSymbol } from 'type-assurer'

function getValue(): unknown { return Symbol('foo') }
const fallbackSymbol = Symbol('bar')

const value = fallbackSymbol(getValue(), fallbackSymbol)
// When the value is not a symbol, fallbackSymbol is returned.
// value is symbol

const symbol1: unique symbol = Symbol('baz')
function getValue2(): typeof symbol1 | undefined { return symbol1 }
const fallbackSymbol2: unique symbol = Symbol('qux')

const value2 = fallbackSymbol(getValue2(), fallbackSymbol2)
// When the value is not a symbol, fallbackSymbol2 is returned.
// value is typeof symbol1 | typeof fallbackSymbol2
```
