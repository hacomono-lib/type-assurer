import type { JsonValue } from '~/lib'

export type JsonParsable = JsonStrPrimitive | JsonStrArray | JsonStrObject

/**
 * Type that cannot be inferred strictly
 */
export type WeakJsonParsable = string

type JsonStrPrimitive = `${number}` | `${boolean}` | `${null}`

// TODO: Can't express with current typescript
type JsonStrArray = `[${string}]`

// TODO: Can't express with current typescript
type ParseJsonStrArray<_T extends JsonStrArray> = JsonValue[]

// TODO: Can't express with current typescript
type JsonStrObject = `{${string}}`

// TODO: Can't express with current typescript
type ParseJsonStrObject<_T extends JsonStrObject> = JsonValue

export type ParseJson<T extends string> = T extends `${infer U extends number}`
  ? U
  : T extends `${infer V extends boolean}`
    ? V
    : T extends `${infer W extends null}`
      ? W
      : T extends `{${string}}`
        ? ParseJsonStrObject<T>
        : T extends `[${string}]`
          ? ParseJsonStrArray<T>
          : JsonValue

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type NotJsonParsable = Exclude<any, JsonParsable>
