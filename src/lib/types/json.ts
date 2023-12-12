export type JSON = JSONPrimitive | JSONArray | JSONObject

export type JSONPrimitive = string | number | boolean | null

export type JSONArray = JSON[] | readonly JSON[]

export type JSONObject = { [Key in string]: JSON } & { [Key in string]?: JSON | undefined }
