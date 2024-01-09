import type { JsonPrimitive } from '~/lib'

export type Jsonifiable = JsonPrimitive | JsonifiableArray | JsonifiableObject

/**
 * Type that cannot be inferred strictly
 */
export type WeakJsonifiable = JsonPrimitive | object

export type JsonifiableArray = Jsonifiable[] | readonly Jsonifiable[]

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type NotJsonifiable = Exclude<any, Jsonifiable>

export type JsonifiableObject =
  | ({ [Key in string]: Jsonifiable } & { [Key in string]?: Jsonifiable | undefined })
  // biome-ignore lint/style/useNamingConvention: <explanation>
  | { toJSON: () => Jsonifiable }

export type JsonGuard<T> = T extends Jsonifiable ? T : unknown extends T ? Jsonifiable : never

// FIXME: Can't express with current typescript
export type Jsonify<T extends Jsonifiable> = JsonGuard<T>
