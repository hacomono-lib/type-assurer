import type { JsonPrimitive } from '../../lib/types'

export type Jsonifiable = JsonPrimitive | JsonifiableArray | JsonifiableObject

export type JsonifiableArray = Jsonifiable[] | readonly Jsonifiable[]

export type JsonifiableObject =
  | ({ [Key in string]: Jsonifiable } & { [Key in string]?: Jsonifiable | undefined })
  | { toJSON: () => Jsonifiable }

export type JsonifiableGuard<T> = T extends JsonPrimitive
  ? T
  : T extends JsonifiableArray
  ? T
  : T extends JsonifiableObject
  ? T
  : T extends object
  ? null | JsonifiableObject | JsonifiableArray
  : never
