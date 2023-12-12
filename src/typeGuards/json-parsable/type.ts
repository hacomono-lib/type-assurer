import type { JSON, JSONPrimitive } from '../../lib/types'

export type JSONParsable = JSONStrPrimitive | JSONStrArray | JSONStrObject

type JSONStrPrimitive = `"${JSONPrimitive}"`

// TODO: Can't express with current typescript
type JSONStrArray = `[${string}]`

// TODO: Can't express with current typescript
type JSONStrObject = `{${string}}`

// TODO: Can't express with current typescript
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ParseJSON<_T extends JSONParsable> = JSON
