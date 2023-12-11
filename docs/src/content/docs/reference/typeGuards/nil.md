---
title: nil
description: A Type Guard Utility functions for checking if a value is `null` or `undefined`.
---
A Type Guard Utility functions for checking if a value is `null` or `undefined`.

:::note
`assertNil` `ensureNil` `fallbackNil` are not implemented because it is not necessary. they are not useful.
:::

## Example of return value

| input | result |
| ----- | ------ |
| `null` | true |
| `undefined` | true |
| other | false |

## isNil

A Type Guard function for checking if a value is `null` or `undefined`.

This function is determined by `target === null || target === undefined`.

### Basic Usage

```typescript
function isNil<T>(target: T): target is Exclude<T, null | undefined>
```

#### params

- `target` .. The value to check.

#### returns

- `true` .. When the value is `null` or `undefined`.
- `false` .. When the value is not `null` and not `undefined`.

### Examples

```typescript
import { isNil } from 'type-assurer'

const value: unknown = 0

if (isNil(value)) {
  // value is null or undefined
} else {
  // value is number
}
```
