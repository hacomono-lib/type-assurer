export type JsonValue = JsonPrimitive | JsonArray | JsonObject

export type JsonPrimitive = string | number | boolean | null

export type JsonArray = JsonValue[] | readonly JsonValue[]

export type JsonObject = { [Key in string]: JsonValue } & { [Key in string]?: JsonValue | undefined }
