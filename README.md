# type-assurer

type-assurer is a TypeScript library that provides shorthand type assertions and type guard functions for multiple types.

## Installation

```sh
npm install type-assurer
```

## Usage

### required settings


### basic usage

`type-assurer` provides three types of guard functions:

- `isNotNil`: Provides a TypeScript type guard function
- `assertNotNil`: Provides a TypeScript type assertion function
- `ensureNotNil`: Performs an assertion and throws a TypeError. Otherwise, it returns the same value as the argument.

`isNotNil` provides a TypeScript type guard function. It can be used to narrow down a type with a boolean check.

```ts
import { isNotNil } from 'type-assurer';

declare const value: string | undefined;

if (isNotNil(value)) {
  // `value` is narrowed down to `string` here
  console.log(value.toUpperCase());
}
```

`assertsNotNil` provides a shorthand for a TypeScript type assertion function. It checks that the value is not null or undefined, and throws a TypeError if it is.

```ts
import { assertsNotNil } from 'type-assurer';

function greet(name: string | undefined) {
  assertsNotNil(name);
  console.log(`Hello, ${name}!`);
}

greet('Alice');
greet(undefined); // Throws a TypeError
```

`ensureNotNil` performs an assertion and throws a TypeError if the argument is null or undefined. Otherwise, it returns the same value as the argument.

```ts
import { ensureNotNil } from 'type-assurer';

declare function getValue(): string | undefined;

const value = ensureNotNil(getValue()); // Throws a TypeError if `getValue()` returns `undefined`
console.log(value.toUpperCase());
```

## Api

### `isNil`, `assertNil`, `ensureNil`

#### `isNil`

Type: `(value: unknown) => value is null | undefined`
Description: Returns true if the value is null or undefined, otherwise returns false.

#### `assertNil`

Type: `(value: unknown, message?: string | (() => string)) => asserts value is null | undefined`
Description: Throws a TypeError with the given message if the value is not null or undefined.

#### `ensureNil`

Type: `(value: unknown, message?: string | (() => string)) => null | undefined`
Description: Performs an assertion and throws a TypeError if the value is not null or undefined.

### `isNotNil`, `assertNotNil`, `ensureNotNil`

(埋めてください)

#### `isNotNil`

Type: `<T>(value: T | null | undefined) => value is T`
Description: Returns true if the value is not null or undefined, otherwise returns false.

#### `assertNotNil`

Type: `<T>(value: T | null | undefined, message?: string | (() => string)) => asserts value is T`
Description: Throws a TypeError with the given message if the value is null or undefined.


#### `ensureNotNil`

Type: `<T>(value: T | null | undefined, message?: string | (() => string)) => T`
Description: Performs an assertion and throws a TypeError if the value is null or undefined. Otherwise, it returns the same value as the argument.

### TODO

- String
- Number
- Boolean
- Array
- Empty
- Symbol
- Function
- more...

## License

This project is [MIT licensed.](./LICENSE)
