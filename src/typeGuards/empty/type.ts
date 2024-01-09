export type EmptyString = ''

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type EmptyArray<T extends any[] = any[]> = T & []

export type EmptyObject<
  T extends Record<string | number | symbol, unknown> = Record<string | number | symbol, unknown>,
> = T & Record<string | number | symbol, never>

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

export type GuardIsEmpty<T> = unknown extends T
? Empty & T
: T extends null
  ? null & T
  : T extends undefined
    ? undefined & T
    : T extends string
      ? EmptyString & T
      : // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        T extends any[]
        ? EmptyArray<T>
        : T extends Record<string, unknown>
          ? EmptyObject<T>
          : T
