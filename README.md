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
  - The reversed versions of the above b, c, and d
  - Generator provided for custom type guards for non-primitive types

## Installation

```bash
npm install type-assurer
```

## Usage

The library provides 7 utility functions for each type guard. In this example, we'll use `isString` as the base type guard function. The same pattern can be followed to implement other lodash-compatible type guards like `isNull`, `isNumber`, etc.

Note that `fallbackNotNil` can be replaced with the `??` operator. Functions that can be simplified using standard JavaScript expressions, like this example, are not targeted for implementation.

### isString

This is a simple type guard function that checks if a given value is a string.

```typescript
import { isString } from "type-assurer";

declare const value: unknown;

if (isString(value)) {
  console.log(`This is a string: ${value}`);
} else {
  console.log("This is not a string");
}
```

### assertString

This function asserts that a given value is a string, and throws an error with a custom message if it's not.

```typescript
import { assertString } from "type-assurer";

declare const value: unknown;

assertString(value, "Value must be a string"); 
// No error if value is a string, otherwise throws an error with the message "Value must be a string"
```

### ensureString

This function evaluates a value and returns it if it passes the type guard (in this case, if it's a string). If the value doesn't pass the type guard, an error is thrown.

```typescript
import { ensureString } from "type-assurer";

declare function getValue(): unknown;

const ensuredString: string = ensureString(getValue(), "Value must be a string"); 
// No error if getValue returns a string, otherwise throws an error with the message "Value must be a string"
```

### fallbackString

This function evaluates a value and returns it if it passes the type guard (in this case, if it's a string). If the value doesn't pass the type guard, it returns the provided fallback value.

```typescript
import { fallbackString } from "type-assurer";

declare function getValue(): unknown;

const stringWithFallback: string = fallbackString(getValue(), "default"); 
// Returns value if it's a string, otherwise returns the fallbackValue
```

### assertNotString

This function asserts that a given value is not a string, and throws an error with a custom message if it is.

```typescript
import { assertNotString } from "type-assurer";

declare const value: unknown;

assertNotString(value, "Value must not be a string"); 
// No error if value is not a string, otherwise throws an error with the message "Value must not be a string"
```

### ensureNotString

This function evaluates a value and returns it if it doesn't pass the type guard (in this case, if it's not a string). If the value passes the type guard, an error is thrown.

```typescript
import { ensureNotString } from "type-assurer";

declare function getValue(): string | number;

const ensuredNotString: number = ensureNotString(getValue(), "Value must not be a string"); 
// No error if getValue returns not a string, otherwise throws an errort with the message "Value must not be a string"
```

### fallbackNotString

This function evaluates a value and returns it if it doesn't pass the type guard (in this case, if it's not a string). If the value passes the type guard, it returns the provided fallback value.

```typescript
import { fallbackNotString } from "type-assurer";

declare function getValue(): string | number;

const notStringWithFallback: number = fallbackNotString(getValue(), -3); 
// Returns value if it's not a string, otherwise returns the fallbackValue
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any proposed changes or feature requests.

## License

MIT
