export type Json = JsonPrimitive | JsonArray | JsonObject

export type JsonPrimitive = string | number | boolean | null

export type JsonArray = Json[] | readonly Json[]

export type JsonObject = { [Key in string]: Json } & { [Key in string]?: Json | undefined }
