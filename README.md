# type-assurer

`type-assurer` is a TypeScript-first type checking library, providing compatibility with lodash's type guard functions while ensuring type safety. Designed with ESModules in mind, it allows for tree-shaking to minimize bundle sizes.

## Features

- Compatible with lodash type guard functions
- TypeScript-first implementation with accurate type inference
- ESModule ready for tree-shaking and bundle size optimization
- No external dependencies
- A collection of 7 type guard functions:
  a. isString - Similar to lodash's type guard functions
  b. assertString - Provides TypeScript's type assertion feature
  c. ensureString - Evaluates the argument's type and returns the value if the type guard passes, otherwise throws an exception
  d. fallbackString - Evaluates the first argument's type and returns the value if the type guard passes, otherwise returns the second argument's value
  - The reversed versions
  - Generator provided for custom type guards for non-primitive types

## Installation

```bash
npm install type-assurer
```

## Usage

The library provides 8 utility functions for each type guard, such as `isString`, `isNull`, etc.

And, note that `fallbackNotNil` can be replaced with the `??` operator. Functions that can be simplified using standard JavaScript expressions, like this example, are not targeted for implementation.

### is, isNot

Functions such as `is` simply provide type guards that can be used in conditional branches.

```typescript
import { isString } from 'type-assurer'

declare const value: unknown

if (isString(value)) {
  console.log(`This is a string: ${value}`)
} else {
  console.log('This is not a string')
}
```

Functions such as `isNot` are useful in cases that require a type guard function as an argument, such as Array.prototype.filter.

```typescript
import { isNotNil } from 'type-assurer'

declare const values: string | null

const result = values.filter(isNotNil)
//    ^? string[]
```

### assert, assertNot

Functions with names like `assert` `assertNot` are type assertion functions.
If the type check does not pass, it throws a TypeError.

The second argument can contain an error message.

```typescript
import { assertString } from 'type-assurer'

declare const value: unknown

assertString(value, 'Value must be a string')
// No error if value is a string, otherwise throws an error with the message "Value must be a string"
```

### ensure, ensureNot

Functions with names like `ensure` `ensureNot` are type assertion functions, but return the same value if the type check passes.
It is convenient to write type assertions on a single line.

The second argument can contain an error message.

```typescript
import { ensureString } from 'type-assurer'

declare function fetchData(): Promise<string | undefined>

const value = ensureString(await fetchData(), 'Value must be a string')
//    ^? string
// No error if fetchData returns a string, otherwise throws an error with the message "Value must be a string"
```

### fallback, fallbackNot

Functions like `fallback` `fallbackNot` are type modification functions.

They return the same value if the type check passes, otherwise they return the fallback value specified in the second argument.

```typescript
import { fallbackString } from 'type-assurer'

declare function fetchData(): Promise<string | undefined>

const value = fallbackString(await fetchData(), 'default')
//    ^? string
// Returns value if it's a string, otherwise returns the fallbackValue
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any proposed changes or feature requests.

## License

MIT
