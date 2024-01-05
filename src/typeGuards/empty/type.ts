export type EmptyString = ''

export type EmptyArray = []

export type EmptyObject = Record<string | number | symbol, never>

export type EmptyPrimitive = null | undefined

export type Empty = EmptyString | EmptyArray | EmptyObject | EmptyPrimitive

export type NotEmptyString = Exclude<string, EmptyString>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NotEmptyArray = Exclude<any[], EmptyArray>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NotEmptyObject = Exclude<Record<string, any>, EmptyObject>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NotEmptyPrimitive = Exclude<any, EmptyPrimitive>

export type NotEmpty = NotEmptyString | NotEmptyArray | NotEmptyObject | NotEmptyPrimitive
