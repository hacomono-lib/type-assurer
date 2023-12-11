import type { JsonPrimitive } from '../../lib/types'

export type Jsonifiable = JsonPrimitive | JsonifiableArray | JsonifiableObject

export type JsonifiableArray = Jsonifiable[] | readonly Jsonifiable[]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NotJsonifiable = Exclude<any, Jsonifiable>

export type JsonifiableObject =
  | ({ [Key in string]: Jsonifiable } & { [Key in string]?: Jsonifiable | undefined })
  | { toJSON: () => Jsonifiable }

export type JsonifiableGuard<T> = T extends Jsonifiable
  ? T
  : unknown extends T
  ? Jsonifiable
  : never
