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
   * @description `Boolean(true)`
   */
  BooleanObject = 'booleanObject',

  /**
   * @description `'true'`
   */
  BooleanParsableTrue = 'booleanParsableTrue',

  /**
   * @description `'false'`
   */
  BooleanParsableFalse = 'booleanParsableFalse',

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
   * @description `Number(1)`
   */
  NumberObject = 'numberObject',

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
   * @description `'123'`
   */
  NumberParsablePositiveInt = 'numberParsablePositiveInt',

  /**
   * @description `'-123'`
   */
  NumberParsableNegativeInt = 'numberParsableNegativeInt',

  /**
   * @description `'123.456'`
   */
  NumberParsablePositiveFloat = 'numberParsablePositiveFloat',

  /**
   * @description `'-123.456'`
   */
  NumberParsableNegativeFloat = 'numberParsableNegativeFloat',

  /**
   * @description `'Infinity'`
   */
  NumberParsablePositiveInfinity = 'numberParsablePositiveInfinity',

  /**
   * @description `'-Infinity'`
   */
  NumberParsableNegativeInfinity = 'numberParsableNegativeInfinity',

  /**
   * @description `'foo'`
   */
  String = 'string',

  /**
   * @description `''`
   */
  EmptyString = 'emptyString',

  /**
   * @description `String('foo')`
   */
  StringObject = 'stringObject',

  /**
   * @description `'123'`
   */
  JsonParsableNumber = 'jsonParsableNumber',

  /**
   * @description `'true'`
   */
  JsonParsableTrue = 'jsonParsableTrue',

  /**
   * @description `'false'`
   */
  JsonParsableFalse = 'jsonParsableFalse',

  /**
   * @description `'null'`
   */
  JsonParsableNull = 'jsonParsableNull',

  /**
   * @description `'foo'`
   */
  JsonParsableString = 'jsonParsableString',

  /**
   * @description `'{"foo": "bar"}'`
   */
  JsonParsableObject = 'jsonParsableObject',

  /**
   * @description `'{"foo": { "bar": "baz" }, "qux": [1, 2, 3] }'`
   */
  JsonParsableComplexObject = 'jsonParsableComplexObject',

  /**
   * @description `'{}'`
   */
  JsonParsableEmptyObject = 'jsonParsableEmptyObject',

  /**
   * @description `'[1, 2, 3]'`
   */
  JsonParsableArray = 'jsonParsableArray',

  /**
   * @description `'[]'`
   */
  JsonParsableEmptyArray = 'jsonParsableEmptyArray',

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
  BlankArray = 'blankArray',

  /**
   * @description `document.body.children`
   */
  ArrayLike = 'arrayLike',

  /**
   * @description `new ArrayBuffer(8)`
   */
  ArrayBuffer = 'arrayBuffer',

  /**
   * @description `new Uint8Array(8)`
   */
  Uint8Array = 'uint8Array',

  /**
   * @description `new Uint8ClampedArray(8)`
   */
  Uint8ClampedArray = 'uint8ClampedArray',

  /**
   * @description `new Uint16Array(8)`
   */
  Uint16Array = 'uint16Array',

  /**
   * @description `new Uint32Array(8)`
   */
  Uint32Array = 'uint32Array',

  /**
   * @description `new Int8Array(8)`
   */
  Int8Array = 'int8Array',

  /**
   * @description `new Int16Array(8)`
   */
  Int16Array = 'int16Array',

  /**
   * @description `new Int32Array(8)`
   */
  Int32Array = 'int32Array',

  /**
   * @description `new Float32Array(8)`
   */
  Float32Array = 'float32Array',

  /**
   * @description `new Float64Array(8)`
   */
  Float64Array = 'float64Array',

  /**
   * @description `new BigInt64Array(8)`
   */
  BigInt64Array = 'bigint64Array',

  /**
   * @description `new BigUint64Array(8)`
   */
  BigUint64Array = 'biguint64Array',

  /**
   * @description `new SharedArrayBuffer(8)`
   */
  SharedArrayBuffer = 'sharedArrayBuffer',

  /**
   * @description `new DataView(new ArrayBuffer(8))`
   */
  DataView = 'dataView',

  /**
   * @description `new DataView(new ArrayBuffer(0))`
   */
  EmptyDataView = 'emptyDataView',

  /**
   * @description `Buffer.from('foo')`
   */
  Buffer = 'buffer',

  /**
   * @description `Buffer.alloc(0)`
   */
  EmptyBuffer = 'emptyBuffer',

  /**
   * @description `{ foo: 'bar' }`
   */
  Object = 'object',

  /**
   * @description `{ }`
   */
  EmptyObject = 'emptyObject',

  /**
   * @description `Object.create(null)`
   */
  BlankObject = 'blankObject',

  /**
   * @description `{ foo: [Circular] }`
   */
  RecursiveObject = 'recursiveObject',

  /**
   * @description `{ [Symbol.toStringTag]: () => 'Foo' }`
   */
  WellKnownSymbolObject = 'wellKnownSymbolObject',

  /**
   * @description `{ *[Symbol.iterator]() { yield 1 } }`
   */
  IterableObject = 'iterableObject',

  /**
   * @description `{ async *[Symbol.asyncIterator]() { yield 1 } }`
   */
  AsyncIterableObject = 'asyncIterableObject',

  /**
   * @description `{ foo: 'bar', baz: { toJSON: (k) => `${k}` } }`
   */
  JsonifiableObject = 'jsonifiableObject',

  /**
   * @description `[{ toJSON: (k) => `${k}` }]`
   */
  JsonifiableObjectInArray = 'jsonifiableObjectInArray',

  /**
   * @description `/foo/`
   */
  RegExp = 'regExp',

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
  ThenableObject = 'thenableObject',

  /**
   * @description `{ const f = () => void 0; f.then = () => void 0; return f; }`
   */
  ThenableFunction = 'thenableFunction',

  /**
   * @description `new class { then() { } }`
   */
  ThenableInstance = 'thenableInstance',

  /**
   * @description `await Promise.resolve()`
   */
  Awaited = 'awaited',

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
  EmptyWeakSet = 'emptyWeakSet'
}
