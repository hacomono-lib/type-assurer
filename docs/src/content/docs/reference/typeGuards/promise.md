---
title: promise
description: A Type Guard Utility functions for checking if a value is a Promise.
---
A Type Guard Utility functions for checking if a value is a Promise.

## Example of return value

| input | result |
| ----- | ------ |
| Promise <br> (e.g. `Promise.resolve('foo')`) | true |
| Promise object <br> (e.g. `new Promise(() => {})`) | true |
| awaited async function <br> (e.g. `await fetchData()`) | true |
| Promise like object <br> (e.g. `{ then: () => {} }`) | false |
| other <br> (e.g. `null`, `undefined`, `0`, `''`, `false`, `true`, `[]`, `{}`) | false |

## isPromise

A Type Guard function for checking if a value is a Promise.

This determination is made by `instanceof Promise`.
Therefore, PromiseLike objects with a then method will be judged as false.
If you want to make this true, see isAwaitable.

### Basic Usage (isPromise)

```typescript
function isPromise(target: unknown): target is Promise<unknown>
```

#### params

- `target` .. The value to check.

#### returns

- `true` .. When the value is a Promise.
- `false` .. When the value is not a Promise.

### Examples (isPromise)

```typescript
import { isPromise } from 'type-assurer'

const value: unknown = Promise.resolve('foo')

if (isPromise(value)) {
  // value is Promise<unknown>
} else {
  // value is unknown
}

const value2: Promise<string> | string = Promise.resolve('foo')

if (isPromise(value2)) {
  // value2 is Promise<string>
} else {
  // value2 is string
}
```

## assertPromise

A Type Assertion function for checking if a value is a Promise.

### Basic Usage (assertPromise)

```typescript
function assertPromise(target: unknown, errorMessage?: ErrorMessage): asserts target is Promise<unknown>
```

#### params

- `target` .. The value to check.
- `errorMessage` .. (optional) The error message to be displayed when the value is not a Promise.

#### returns

- `void` .. When the value is a Promise.

#### throws

- `TypeAssertionError` .. When the value is not a Promise.

### Examples (assertPromise)

```typescript
import { assertPromise } from 'type-assurer'

const value: unknown = Promise.resolve('foo')

assertPromise(value) 
// When the value is not a Promise, TypeAssertionError is thrown.
// value is Promise<unknown>

const value2: Promise<string> | string = Promise.resolve('foo')

assertPromise(value2)
// When the value is not a Promise, TypeAssertionError is thrown.
// value2 is Promise<string>
```

## ensurePromise

Ensure that the value is a Promise. If it is not a Promise, throw an error.

### Basic Usage (ensurePromise)

```typescript
function ensurePromise(target: unknown, errorMessage?: ErrorMessage): Promise<unknown>
```

#### params

- `target` .. The value to check.
- `errorMessage` .. (optional) The error message to be displayed when the value is not a Promise.

#### returns

- `Promise<unknown>` .. When the value is a Promise.

#### throws

- `TypeAssertionError` .. When the value is not a Promise.

### Examples (ensurePromise)

```typescript
import { ensurePromise } from 'type-assurer'

declare function fetchData(): unknown

const result = await ensurePromise(fetchData())
// When the value is not a Promise, TypeAssertionError is thrown.
// result is Promise<unknown>

declare function fetchData2(): Promise<string> | string

const result2 = await ensurePromise(fetchData2())
// When the value is not a Promise, TypeAssertionError is thrown.
// result2 is Promise<string>
```

## fallbackPromise

Fallback to the fallback value if the value is not a Promise.

### Basic Usage (fallbackPromise)

```typescript
function fallbackPromise(target: unknown, fallbackValue: Promise<unknown>): Promise<unknown>
```

#### params

- `target` .. The value to check.
- `fallbackValue` .. The fallback value to be returned when the value is not a Promise.

#### returns

- `Promise<unknown>` .. When the value is a Promise. Otherwise, the fallback value is returned.

### Examples (fallbackPromise)

```typescript
import { fallbackPromise } from 'type-assurer'

declare function fetchData(): unknown

const result = await fallbackPromise(fetchData(), Promise.resolve('fallback'))
// When the value is not a Promise, fallback value is returned.
// result is Promise<unknown>

declare function fetchData2(): Promise<string> | string

const result2 = await fallbackPromise(fetchData2(), Promise.resolve('fallback'))
// When the value is not a Promise, fallback value is returned.
// result2 is Promise<string>
```
