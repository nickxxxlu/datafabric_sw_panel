export type NonUndefined<T> = T extends undefined ? never : T;

export type KeysOfType<T, PropT> = {
  [P in keyof T]-?: NonUndefined<T[P]> extends PropT ? P : never;
}[keyof T];

export type ArrayElement<A> = A extends ReadonlyArray<infer T> ? T : never;

export type EnumType<T> = Record<string, T>;
