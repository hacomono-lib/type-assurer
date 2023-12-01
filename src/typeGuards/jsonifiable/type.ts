import type { JsonPrimitive } from '../../lib/types'

export type Jsonifiable = JsonPrimitive | JsonifibleArray | JsonifiableObject

type JsonifibleArray = Jsonifiable[] | readonly Jsonifiable[]

type JsonifiableObject =
  | ({ [Key in string]: Jsonifiable } & { [Key in string]?: Jsonifiable | undefined })
  | { toJSON: () => Jsonifiable }
