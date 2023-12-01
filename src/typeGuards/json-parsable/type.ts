import { JsonPrimitive } from '../../lib/types'

export type JsonParsable = JsonStrPrimitive | JsonStrArray | JsonStrObject

type JsonStrPrimitive = `"${JsonPrimitive}"`

// TODO: Can't express with current typescript
type JsonStrArray = `[${string}]`

// TODO: Can't express with current typescript
type JsonStrObject = `{${string}}`
