import { ValueType } from './type'

type ValueFactory = () => unknown

const generators = {
  [ValueType.True]: () => true,
  [ValueType.False]: () => false,
  [ValueType.Null]: () => null,
  [ValueType.Undefined]: () => undefined,
  [ValueType.PositiveNumber]: () => 1,
  [ValueType.PositiveInfinity]: () => Infinity,
  [ValueType.Zero]: () => 0,
  [ValueType.NegativeNumber]: () => -1,
  [ValueType.NegativeInfinity]: () => -Infinity,
  [ValueType.PositiveBigInt]: () => BigInt(1),
  [ValueType.NegativeBigInt]: () => BigInt(-1),
  [ValueType.NaN]: () => NaN,
  [ValueType.String]: () => 'foo',
  [ValueType.EmptyString]: () => '',
  [ValueType.Array]: () => [1, 2, 3],
  [ValueType.EmptyArray]: () => [],
  [ValueType.BlankArray]: () => Array(3),
  [ValueType.ArrayLike]: () => ({ length: 3 }),
  [ValueType.ArrayBuffer]: () => new ArrayBuffer(8),
  [ValueType.Object]: () => ({ foo: 'bar' }),
  [ValueType.EmptyObject]: () => ({}),
  [ValueType.RecursiveObject]: () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj: any = {}
    obj.foo = obj
    return obj as {}
  },
  [ValueType.Proxy]: () => new Proxy({}, {}),
  [ValueType.Promise]: () => new Promise(() => void 0),
  [ValueType.PromiseLike]: () => ({ then: () => void 0 }),
  [ValueType.Date]: () => new Date(),
  [ValueType.Error]: () => new Error(),
  [ValueType.Class]: () => class Foo {},
  [ValueType.ClassInstance]: () => new (class Foo {})(),
  [ValueType.Map]: () => new Map([['foo', 'bar']]),
  [ValueType.EmptyMap]: () => new Map(),
  [ValueType.WeakMap]: () => new WeakMap([[{}, 'bar']]),
  [ValueType.EmptyWeakMap]: () => new WeakMap(),
  [ValueType.Set]: () => new Set([1, 2, 3]),
  [ValueType.EmptySet]: () => new Set(),
  [ValueType.WeakSet]: () => new WeakSet([{}, {}]),
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
  [ValueType.Symbol]: () => Symbol('foo')
} as const satisfies Record<ValueType, Readonly<ValueFactory>>

Object.freeze(generators)

export function allTypes(): ValueType[] {
  return Object.values(ValueType)
}

export function getGenerator(type: ValueType): () => unknown {
  return generators[type]
}

export interface TestOption {
  negative?: boolean
}
