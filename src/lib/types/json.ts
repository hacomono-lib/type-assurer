// biome-ignore lint/style/useNamingConvention: <explanation>
export type JSONValue = JSONPrimitive | JSONArray | JSONObject

// biome-ignore lint/style/useNamingConvention: <explanation>
export type JSONPrimitive = string | number | boolean | null

// biome-ignore lint/style/useNamingConvention: <explanation>
export type JSONArray = JSONValue[] | readonly JSONValue[]

// biome-ignore lint/style/useNamingConvention: <explanation>
export type JSONObject = { [Key in string]: JSONValue } & { [Key in string]?: JSONValue | undefined }
