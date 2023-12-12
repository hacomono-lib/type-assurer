import { JSON } from '../../lib/types'
import type { JSONPrimitive } from '../../lib/types'

export type JSONifiable = JSONPrimitive | JSONArray | JSONifiableObject

type JSONArray = JSONifiable[] | readonly JSONifiable[]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NotJSONifiable = Exclude<any, JSONifiable>

type JSONifiableObject =
  | ({ [Key in string]: JSONifiable } & { [Key in string]?: JSONifiable | undefined })
  | { toJSON: () => JSONifiable }

export type JSONGuard<T> = T extends JSONifiable ? T : unknown extends T ? JSONifiable : never

// FIXME: Can't express with current typescript
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type JSONify<T extends JSONifiable> = JSON
