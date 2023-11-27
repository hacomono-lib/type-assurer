export type Json = JsonPrimitive | JsonArray | JsonObject

type JsonPrimitive = string | number | boolean | null

type JsonArray = Json[] | readonly Json[]

type JsonObject = { [Key in string]: Json } & { [Key in string]?: Json | undefined }

export type JsonStr = JsonStrPrimitive | JsonStrArray | JsonStrObject

type JsonStrPrimitive = `"${JsonPrimitive}"`

// TODO: Can't express with current typescript
type JsonStrArray = `[${string}]`

// TODO: Can't express with current typescript
type JsonStrObject = `{${string}}`

export type Jsonifiable = JsonPrimitive | JsonifibleArray | JsonifiableObject

type JsonifibleArray = Jsonifiable[] | readonly Jsonifiable[]

type JsonifiableObject =
  | ({ [Key in string]: Jsonifiable } & { [Key in string]?: Jsonifiable | undefined })
  | { toJSON: () => Jsonifiable }

export type JsonifiableString = JsonStr
