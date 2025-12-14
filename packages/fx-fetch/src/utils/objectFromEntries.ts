export function objectFromEntries<K extends PropertyKey, V>(
  entries: Iterable<readonly [K, V]>
): {
  readonly [key in K]: V;
} {
  return Object.fromEntries(entries) as {
    readonly [key in K]: V;
  };
}

export function objectFromEntriesMutable<K extends PropertyKey, V>(
  entries: Iterable<readonly [K, V]>
): {
  [key in K]: V;
} {
  return Object.fromEntries(entries) as {
    [key in K]: V;
  };
}
