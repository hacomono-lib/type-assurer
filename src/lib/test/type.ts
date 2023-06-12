export enum ValueType {

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
   * @description `'foo'`
   */
  String = 'string',

  /**
   * @description `''`
   */
  EmptyString = 'emptyString',

  /**
   * @description `[1, 2, 3]`
   */
  Array = 'array',

  /**
   * @description `[]`
   */
  EmptyArray = 'emptyArray',

  /**
   * @description `Array(3)`
   */
  BlankArray = 'spacedArray',

  /**
   * @description `document.body.children`
   */
  ArrayLike = 'arrayLike',

  /**
   * @description `new ArrayBuffer(8)`
   */
  ArrayBuffer = 'arrayBuffer',

  /**
   * @description `{ foo: 'bar' }`
   */
  Object = 'object',

  /**
   * @description `{ }`
   */
  EmptyObject = 'emptyObject',

  /**
   * @description `{ foo: [Circular] }`
   */
  RecursiveObject = 'recursiveObject',

  /**
   * @description `() => void 0`
   */
  Function = 'function',

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
   * @description `new Map([['foo', 'bar']])`
   */
  Map = 'map',

  /**
   * @description `new Map()`
   */
  EmptyMap = 'emptyMap',

  /**
   * @description `new WeakMap([[{}, 'bar']])`
   */
  WeakMap = 'weakMap',

  /**
   * @description `new WeakMap()`
   */
  EmptyWeakMap = 'emptyWeakMap',

  /**
   * @description `new Set(['foo'])`
   */
  Set = 'set',

  /**
   * @description `new Set()`
   */
  EmptySet = 'emptySet',

  /**
   * @description `new WeakSet([{}])`
   */
  WeakSet = 'weakSet',

  /**
   * @description `new WeakSet()`
   */
  EmptyWeakSet = 'emptyWeakSet',
}
