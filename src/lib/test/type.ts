export enum ValueType {

  /**
   * @description alias of `True`, `False`
   */
  Boolean = 'boolean',
  /**
   * @description `true`
   */
  True = 'true',

  /**
   * @description `false`
   */
  False = 'false',

  /**
   * @description `null`
   */
  Null = 'null',

  /**
   * @description `undefined`
   */
  Undefined = 'undefined',

  /**
   * @description alias of `PositiveNumber`, `PositiveInfinity`, `Zero`, `NegativeNumber`, `NegativeInfinity`, `NaN`
   */
  Number = 'number',

  /**
   * @description `1`
   */
  PositiveNumber = 'positiveNumber',

  /**
   * @description `Infinity`
   */
  PositiveInfinity = 'positiveInfinity',


  /**
   * @description `0`
   */
  Zero = 'zero',

  /**
   * @description `-1`
   */
  NegativeNumber = 'negativeNumber',

  /**
   * @description `-Infinity`
   */
  NegativeInfinity = 'negativeInfinity',

  /**
   * @description alias of `PositiveBigInt`, `NegativeBigInt`
   */
  BigInt = 'bigint',

  /**
   * @description `BigInt(1)`
   */
  PositiveBigInt = 'positiveBigint',

  /**
   * @description `BigInt(-1)`
   */
  NegativeBigInt = 'negativeBigint',

  /**
   * @description `NaN`
   */
  NaN = 'NaN',

  /**
   * @description `''`
   */
  EmptyString = 'emptyString',

  /**
   * @description `'foo'`
   */
  NotEmptyString = 'notEmptyString',

  /**
   * @description alias of `EmptyString`, `NonEmptyString`
   */
  String = 'string',

  /**
   * @description alias of `EmptyArray`, `NonEmptyArray`, `BlankArray`
   */
  Array = 'array',

  /**
   * @description `[1, 2, 3]`
   */
  NonEmptyArray = 'nonEmptyArray',

  /**
   * @description `[]`
   */
  EmptyArray = 'emptyArray',

  /**
   * @description `Array(3)`
   */
  BlankArray = 'spacedArray',

  /**
   * @description `{ length: 3 }`
   */
  ArrayLike = 'arrayLike',

  /**
   * @description alias of `EmptyObject`, `NonEmptyObject`, `Symbol`, `Proxy`, `Promise`, `PromiseLike`, `Date`, `Error`
   */
  Object = 'object',

  /**
   * @description `{ foo: 'bar' }`
   */
  NotEmptyObject = 'notEmptyObject',

  /**
   * @description `{ }`
   */
  EmptyObject = 'emptyObject',

  /**
   * @description alias of `NormalFunction`, `AsyncFunction`, `GeneratorFunction`, `AsyncGeneratorFunction`
   */
  Function = 'function',

  /**
   * @description `() => void 0`
   */
  NormalFunction = 'normalFunction',

  /**
   * @description `async () => void 0`
   */
  AsyncFunction = 'asyncFunction',

  /**
   * @description `function* () { yield 1 }`
   */
  GeneratorFunction = 'generatorFunction',

  /**
   * @description `async function* () { yield 1 }`
   */
  AsyncGeneratorFunction = 'asyncGeneratorFunction',

  /**
   * @description `Symbol('foo')`
   */
  Symbol = 'symbol',

  /**
   * @description `new Proxy({}, {})`
   */
  Proxy = 'proxy',

  /**
   * @description `new Promise(() => void 0)`
   */
  Promise = 'promise',

  /**
   * @description `{ then: () => void 0 }`
   */
  PromiseLike = 'promiseLike',

  /**
   * @description `new Date()`
   */
  Date = 'date',

  /**
   * @description `new Error()`
   */
  Error = 'error',

  /**
   * @description `class Foo {}`
   */
  Class = 'class',

  /**
   * @description `new Foo()` where `class Foo {}`
   */
  ClassInstance = 'classInstance',

  /**
   * @description alias of `EmptyMap`, `NotEmptyMap`
   */
  Map = 'map',

  /**
   * @description `new Map()`
   */
  EmptyMap = 'emptyMap',

  /**
   * @description `new Map([['foo', 'bar']])`
   */
  NotEmptyMap = 'notEmptyMap',

  /**
   * @description alias of `EmptyWeakMap`, `NotEmptyWeakMap`
   */
  WeakMap = 'weakMap',

  /**
   * @description `new WeakMap()`
   */
  EmptyWeakMap = 'emptyWeakMap',

  /**
   * @description `new WeakMap([[{}, 'bar']])`
   */
  NotEmptyWeakMap = 'notEmptyWeakMap',

  /**
   * @description alias of `EmptySet`, `NotEmptySet`
   */
  Set = 'set',

  /**
   * @description `new Set()`
   */
  EmptySet = 'emptySet',

  /**
   * @description `new Set(['foo'])`
   */
  NotEmptySet = 'notEmptySet',

  /**
   * @description alias of `EmptyWeakSet`, `NotEmptyWeakSet`
   */
  WeakSet = 'weakSet',

  /**
   * @description `new WeakSet()`
   */
  EmptyWeakSet = 'emptyWeakSet',

  /**
   * @description `new WeakSet([{}])`
   */
  NotEmptyWeakSet = 'notEmptyWeakSet',
}
