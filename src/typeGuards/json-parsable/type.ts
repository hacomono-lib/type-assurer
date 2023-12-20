import type { JSONValue } from '../../lib'

// biome-ignore lint/style/useNamingConvention: <explanation>
export type JSONParsable = JSONStrPrimitive | JSONStrArray | JsonStrObject

// biome-ignore lint/style/useNamingConvention: <explanation>
type JSONStrPrimitive = `${number}` | `${boolean}` | `${null}`

// TODO: Can't express with current typescript
// biome-ignore lint/style/useNamingConvention: <explanation>
type JSONStrArray = `[${string}]`

// TODO: Can't express with current typescript
// biome-ignore lint/style/useNamingConvention: <explanation>
type ParseJSONStrArray<_T extends JSONStrArray> = JSONValue[]

// TODO: Can't express with current typescript
type JsonStrObject = `{${string}}`

// TODO: Can't express with current typescript
// biome-ignore lint/style/useNamingConvention: <explanation>
type ParseJSONStrObject<_T extends JsonStrObject> = JSONValue

// biome-ignore lint/style/useNamingConvention: <explanation>
export type ParseJSON<T extends JSONParsable> = T extends `${infer U extends number | boolean | null}`
  ? U
  : T extends `{${string}}`
    ? ParseJSONStrObject<T>
    : T extends `[${string}]`
      ? ParseJSONStrArray<T>
      : never

// biome-ignore lint/style/useNamingConvention: <explanation>
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type NotJSONParsable = Exclude<any, JSONParsable>
