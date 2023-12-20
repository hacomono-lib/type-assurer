import type { JSONPrimitive } from '../../lib'

// biome-ignore lint/style/useNamingConvention: <explanation>
export type JSONifiable = JSONPrimitive | JSONifiableArray | JSONifiableObject

// biome-ignore lint/style/useNamingConvention: <explanation>
export type JSONifiableArray = JSONifiable[] | readonly JSONifiable[]

// biome-ignore lint/style/useNamingConvention: <explanation>
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type NotJSONifiable = Exclude<any, JSONifiable>

// biome-ignore lint/style/useNamingConvention: <explanation>
export type JSONifiableObject =
  | ({ [Key in string]: JSONifiable } & { [Key in string]?: JSONifiable | undefined })
  // biome-ignore lint/style/useNamingConvention: <explanation>
  | { toJSON: () => JSONifiable }

// biome-ignore lint/style/useNamingConvention: <explanation>
export type JSONGuard<T> = T extends JSONifiable ? T : unknown extends T ? JSONifiable : never

// FIXME: Can't express with current typescript
// biome-ignore lint/style/useNamingConvention: <explanation>
export type JSONify<T extends JSONifiable> = JSONGuard<T>
