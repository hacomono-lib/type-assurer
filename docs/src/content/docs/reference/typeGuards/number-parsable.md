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

note:

Returns false for cases where `Number(value)` would cause an error, such as Symbol.

## isNumberParsable

A Type Guard function for checking if a value is a NumberParsable.

