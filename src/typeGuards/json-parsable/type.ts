import type { JSON } from '../../lib/types'

export type JSONParsable = JSONStrPrimitive | JSONStrArray | JSONStrObject

type JSONStrPrimitive = `${number}` | `${boolean}` | `${null}`

// TODO: Can't express with current typescript
type JSONStrArray = `[${string}]`

// TODO: Can't express with current typescript
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ParseJSONStrArray<_T extends JSONStrArray> = JSON[]

// TODO: Can't express with current typescript
type JSONStrObject = `{${string}}`

// TODO: Can't express with current typescript
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ParseJSONStrObject<_T extends JSONStrObject> = JSON

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ParseJSON<T extends JSONParsable> = T extends `${infer U extends number | boolean | null}`
  ? U
  : T extends `{${string}}`
    ? ParseJSONStrObject<T>
    : T extends `[${string}]`
      ? ParseJSONStrArray<T>
      : never

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NotJSONParsable = Exclude<any, JSONParsable>
