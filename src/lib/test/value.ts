/* eslint-disable max-lines */
import { ValueType } from './type'

type ValueFactory = () => unknown

// WeakMap, WeakSet 用のキー
const persistentObject1 = { key: 1 }
Object.freeze(persistentObject1)

const persistentObject2 = { key: 2 }
Object.freeze(persistentObject2)

const generators = {
  [ValueType.True]: () => true,
  [ValueType.False]: () => false,
  [ValueType.BooleanObject]: () => new Boolean(true),
  [ValueType.ObjectToPrimitiveBoolean]: () => ({ [Symbol.toPrimitive]: () => true }),
  [ValueType.ObjectValueOfBoolean]: () => ({ valueOf: () => true }),
  [ValueType.BooleanParsableTrue]: () => 'true',
  [ValueType.BooleanParsableFalse]: () => 'false',
  [ValueType.Null]: () => null,
  [ValueType.ObjectToPrimitiveNull]: () => ({ [Symbol.toPrimitive]: () => null }),
  [ValueType.ObjectValueOfNull]: () => ({ valueOf: () => null }),
  [ValueType.Undefined]: () => undefined,
  [ValueType.ObjectToPrimitiveUndefined]: () => ({ [Symbol.toPrimitive]: () => undefined }),
  [ValueType.ObjectValueOfUndefined]: () => ({ valueOf: () => undefined }),
  [ValueType.PositiveNumber]: () => 1,
  [ValueType.PositiveInfinity]: () => Infinity,
  [ValueType.Zero]: () => 0,
  [ValueType.NegativeNumber]: () => -1,
  [ValueType.NegativeInfinity]: () => -Infinity,
  [ValueType.NumberObject]: () => new Number(1),
  [ValueType.ObjectToPrimitiveNumber]: () => ({ [Symbol.toPrimitive]: () => 1 }),
  [ValueType.ObjectValueOfNumber]: () => ({ valueOf: () => 1 }),
  [ValueType.PositiveBigInt]: () => 1n,
  [ValueType.NegativeBigInt]: () => -1n,
  [ValueType.BigIntObject]: () => BigInt(1),
  [ValueType.ObjectToPrimitiveBigInt]: () => ({ [Symbol.toPrimitive]: () => 1n }),
  [ValueType.ObjectValueOfBigInt]: () => ({ valueOf: () => 1n }),
  [ValueType.NaN]: () => NaN,
  [ValueType.NumberParsablePositiveInt]: () => '123',
  [ValueType.NumberStringLeadingZero]: () => '0123',
  [ValueType.NumberParsableNegativeInt]: () => '-123',
  [ValueType.NumberParsablePositiveFloat]: () => '123.456',
  [ValueType.NumberParsableNegativeFloat]: () => '-123.456',
  [ValueType.NumberParsablePositiveInfinity]: () => 'Infinity',
  [ValueType.NumberParsableNegativeInfinity]: () => '-Infinity',
  [ValueType.String]: () => 'foo',
  [ValueType.EmptyString]: () => '',
  [ValueType.StringObject]: () => new String('foo'),
  [ValueType.ObjectToPrimitiveString]: () => ({ [Symbol.toPrimitive]: () => 'foo' }),
  [ValueType.ObjectValueOfString]: () => ({ valueOf: () => 'foo' }),
  [ValueType.ObjectToString]: () => ({ toString: () => 'foo' }),
  [ValueType.JsonParsableNumber]: () => '123',
  [ValueType.JsonParsableTrue]: () => 'true',
  [ValueType.JsonParsableFalse]: () => 'false',
  [ValueType.JsonParsableNull]: () => 'null',
  [ValueType.JsonParsableString]: () => '"foo"',
  [ValueType.JsonParsableObject]: () => '{"foo":"bar"}',
  [ValueType.JsonParsableComplexObject]: () => '{"foo":{"bar":"baz"}, "qux": [1,2,3]}',
  [ValueType.JsonParsableEmptyObject]: () => '{}',
  [ValueType.JsonParsableArray]: () => '[1,2,3]',
  [ValueType.JsonParsableEmptyArray]: () => '[]',
  [ValueType.Array]: () => [1, 2, 3],
  [ValueType.EmptyArray]: () => [],
  [ValueType.BlankArray]: () => Array(3),
  [ValueType.ArrayLike]: () => ({ length: 3 }),
  [ValueType.ArrayBuffer]: () => new ArrayBuffer(8),
  [ValueType.Uint8Array]: () => new Uint8Array([1, 2, 3]),
  [ValueType.Uint8ClampedArray]: () => new Uint8ClampedArray([1, 2, 3]),
  [ValueType.Uint16Array]: () => new Uint16Array([1, 2, 3]),
  [ValueType.Uint32Array]: () => new Uint32Array([1, 2, 3]),
  [ValueType.Int8Array]: () => new Int8Array([1, 2, 3]),
  [ValueType.Int16Array]: () => new Int16Array([1, 2, 3]),
  [ValueType.Int32Array]: () => new Int32Array([1, 2, 3]),
  [ValueType.Float32Array]: () => new Float32Array([1, 2, 3]),
  [ValueType.Float64Array]: () => new Float64Array([1, 2, 3]),
  [ValueType.BigInt64Array]: () => new BigInt64Array([1n, 2n, 3n]),
  [ValueType.BigUint64Array]: () => new BigUint64Array([1n, 2n, 3n]),
  [ValueType.SharedArrayBuffer]: () => new SharedArrayBuffer(8),
  [ValueType.DataView]: () => new DataView(new ArrayBuffer(8)),
  [ValueType.EmptyDataView]: () => new DataView(new ArrayBuffer(0)),
  [ValueType.Buffer]: () => Buffer.from('foo'),
  [ValueType.EmptyBuffer]: () => Buffer.alloc(0),
  [ValueType.Object]: () => ({ foo: 'bar' }),
  [ValueType.EmptyObject]: () => ({}),
  [ValueType.BlankObject]: () => Object.create(null),
  [ValueType.RecursiveObject]: () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj: any = {}
    obj.foo = obj
    return obj as {}
  },
  [ValueType.WellKnownSymbolObject]: () => ({ [Symbol.toStringTag]: () => 'Foo' }),
  [ValueType.IterableObject]: () => ({
    *[Symbol.iterator]() {
      yield 1
    }
  }),
  [ValueType.AsyncIterableObject]: () => ({
    async *[Symbol.asyncIterator]() {
      yield 1
    }
  }),
  [ValueType.JsonifiableObject]: () => ({
    foo: 'bar',
    baz: { toJSON: (k: string | number) => `${k}` }
  }),
  [ValueType.JsonifiableObjectInArray]: () => [{ toJSON: (k: string | number) => `${k}` }],
  [ValueType.RegExp]: () => /foo/,
  [ValueType.Proxy]: () => new Proxy({}, {}),
  [ValueType.Promise]: () => new Promise(() => void 0),
  [ValueType.ThenableObject]: () => ({ then: () => void 0 }),
  [ValueType.ThenableFunction]: () => {
    const fn = () => void 0
    fn.then = () => void 0
    return fn
  },
  [ValueType.ThenableInstance]: () =>
    new (class Foo {
      then() {}
    })(),
  [ValueType.Awaited]: async () => await Promise.resolve(),
  [ValueType.Date]: () => new Date(),
  [ValueType.Error]: () => new Error(),
  [ValueType.Class]: () =>
    class Foo {
      bar() {
        return 'bar'
      }
      get baz() {
        return 'baz'
      }
      qux = 'qux'
    },
  [ValueType.ClassInstance]: () =>
    new (class Foo {
      bar() {
        return 'bar'
      }
      get baz() {
        return 'baz'
      }
      qux = 'qux'
    })(),
  [ValueType.Map]: () => new Map([['foo', 'bar']]),
  [ValueType.EmptyMap]: () => new Map(),
  [ValueType.WeakMap]: () => new WeakMap([[persistentObject1, 'bar']]),
  [ValueType.EmptyWeakMap]: () => new WeakMap(),
  [ValueType.Set]: () => new Set([1, 2, 3]),
  [ValueType.EmptySet]: () => new Set(),
  [ValueType.WeakSet]: () => new WeakSet([persistentObject1, persistentObject2]),
  [ValueType.EmptyWeakSet]: () => new WeakSet(),
  [ValueType.Function]: () => () => void 0,
  [ValueType.AsyncFunction]: () => async () => void 0,
  [ValueType.GeneratorFunction]: () =>
    function* () {
      yield 1
    },
  [ValueType.AsyncGeneratorFunction]: () =>
    async function* () {
      yield 1
    },
  [ValueType.Symbol]: () => Symbol('foo'),
  [ValueType.ObjectToPrimitiveSymbol]: () => ({ [Symbol.toPrimitive]: () => Symbol('foo') }),
  [ValueType.ObjectValueOfSymbol]: () => ({ valueOf: () => Symbol('foo') })
} as const satisfies Record<ValueType, Readonly<ValueFactory>>

Object.freeze(generators)

/**
 * Returns a list of all ValueTypes.
 */
export function allTypes(): ValueType[] {
  return Object.values(ValueType)
}

export interface PickTypesOption {
  parsableString?: boolean
  typedArray?: boolean
}

/**
 * Returns a list of ValueTypes that you want to test by specifying expect targets.
 * Here, Value Types that generate the same value (equivalent by '===') as the specified expect types are skipped.
 */
export function testTypes(expectTargets: ValueType[], opt: PickTypesOption = {}): ValueType[] {
  const targetTypes = allTypes().filter((t) => {
    let result = true

    if (!opt.parsableString) {
      result &&=
        !t.toLocaleLowerCase().includes('parsable') &&
        !t.toLocaleLowerCase().includes('jsonifiable')
    }

    if (!opt.typedArray) {
      result &&= !(/^uint|int|float|bigInt|bigUint/.test(t) && t.endsWith('Array'))
    }

    return result
  })

  const cachedValues = targetTypes.reduce(
    (acc, t): Partial<Record<ValueType, unknown>> => ({ ...acc, [t]: getGenerator(t)() }),
    {}
  ) as Record<ValueType, unknown>

  return targetTypes.filter(
    (t) =>
      expectTargets.includes(t) || !expectTargets.some((e) => cachedValues[t] === cachedValues[e])
  )
}

export function getGenerator(type: ValueType): () => unknown {
  return generators[type]
}

export interface TestOption {
  negative?: boolean
}
