type EmptyString = ''

type EmptyArray = []

type EmptyObject = Record<string, never>

type EmptyPrimitive = null | undefined

export type Empty = EmptyString | EmptyArray | EmptyObject | EmptyPrimitive
