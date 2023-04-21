import { ValueType } from './type'

type ValueTypeAlias = ValueType[]
type ValueFactory = () => unknown

export const generators = {
  [ValueType.Boolean]: [ValueType.True, ValueType.False],
  [ValueType.True]: () => true,
  [ValueType.False]: () => false,
  [ValueType.Null]: () => null,
  [ValueType.Undefined]: () => undefined,
  [ValueType.Number]: [
    ValueType.PositiveNumber,
    ValueType.PositiveInfinity,
    ValueType.Zero,
    ValueType.NegativeNumber,
    ValueType.NegativeInfinity,
    ValueType.NaN
  ],
  [ValueType.PositiveNumber]: () => 1,
  [ValueType.PositiveInfinity]: () => Infinity,
  [ValueType.Zero]: () => 0,
  [ValueType.NegativeNumber]: () => -1,
  [ValueType.NegativeInfinity]: () => -Infinity,
  [ValueType.BigInt]: [ValueType.PositiveBigInt, ValueType.NegativeBigInt],
  [ValueType.PositiveBigInt]: () => BigInt(1),
  [ValueType.NegativeBigInt]: () => BigInt(-1),
  [ValueType.NaN]: () => NaN,
  [ValueType.String]: [ValueType.EmptyString, ValueType.NotEmptyString],
  [ValueType.EmptyString]: () => '',
  [ValueType.NotEmptyString]: () => 'foo',
  [ValueType.Array]: [ValueType.EmptyArray, ValueType.NonEmptyArray, ValueType.BlankArray],
  [ValueType.EmptyArray]: () => [],
  [ValueType.NonEmptyArray]: () => [1, 2, 3],
  [ValueType.BlankArray]: () => Array(3),
  [ValueType.ArrayLike]: () => ({ length: 3 }),
  [ValueType.Object]: [
    ValueType.EmptyObject,
    ValueType.NotEmptyObject,
    ValueType.Proxy,
    ValueType.Promise,
    ValueType.PromiseLike,
    ValueType.Date,
    ValueType.Error,
    ValueType.Class,
    ValueType.ClassInstance,
    ValueType.NotEmptyMap,
    ValueType.EmptyMap,
    ValueType.NotEmptyWeakMap,
    ValueType.EmptyWeakMap,
    ValueType.NotEmptySet,
    ValueType.EmptySet,
    ValueType.NotEmptyWeakSet,
    ValueType.EmptyWeakSet
  ],
  [ValueType.EmptyObject]: () => ({}),
  [ValueType.NotEmptyObject]: () => ({ foo: 'bar' }),
  [ValueType.Proxy]: () => new Proxy({}, {}),
  [ValueType.Promise]: () => new Promise(() => void 0),
  [ValueType.PromiseLike]: () => ({ then: () => void 0 }),
  [ValueType.Date]: () => new Date(),
  [ValueType.Error]: () => new Error(),
  [ValueType.Class]: () => class Foo {},
  [ValueType.ClassInstance]: () => new (class Foo {})(),
  [ValueType.Map]: [ValueType.EmptyMap, ValueType.NotEmptyMap],
  [ValueType.EmptyMap]: () => new Map(),
  [ValueType.NotEmptyMap]: () => new Map([['foo', 'bar']]),
  [ValueType.WeakMap]: [ValueType.EmptyWeakMap, ValueType.NotEmptyWeakMap],
  [ValueType.EmptyWeakMap]: () => new WeakMap(),
  [ValueType.NotEmptyWeakMap]: () => new WeakMap([[{}, 'bar']]),
  [ValueType.Set]: [ValueType.EmptySet, ValueType.NotEmptySet],
  [ValueType.EmptySet]: () => new Set(),
  [ValueType.NotEmptySet]: () => new Set([1, 2, 3]),
  [ValueType.WeakSet]: [ValueType.EmptyWeakSet, ValueType.NotEmptyWeakSet],
  [ValueType.EmptyWeakSet]: () => new WeakSet(),
  [ValueType.NotEmptyWeakSet]: () => new WeakSet([{}, {}]),
  [ValueType.Function]: [
    ValueType.NormalFunction,
    ValueType.AsyncFunction,
    ValueType.GeneratorFunction,
    ValueType.AsyncGeneratorFunction
  ],
  [ValueType.NormalFunction]: () => () => void 0,
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
} as const satisfies Record<ValueType, Readonly<ValueFactory | ValueTypeAlias>>

Object.freeze(generators)

export type FactoryType = {
  [K in ValueType]: (typeof generators)[K] extends ValueFactory ? K : never
}[ValueType]

export type AliasType = Exclude<ValueType, FactoryType>

export function allTypes(): ValueType[] {
  return Object.values(ValueType)
}

export interface TestOption {
  pass: ValueType[]
  negative?: boolean
}

export function fixTypes(pass: ValueType[]): { pass: ValueType[]; fail: ValueType[] } {
  const fixedPass = pass.flatMap((t) => {
    const factory = generators[t]
    if (Array.isArray(factory)) {
      return factory
    }

    return [t]
  })

  const fail = allTypes()
    .filter((t) => !fixedPass.includes(t))
    .filter((f) => !Array.isArray(generators[f]))

  return { pass: fixedPass, fail }
}
