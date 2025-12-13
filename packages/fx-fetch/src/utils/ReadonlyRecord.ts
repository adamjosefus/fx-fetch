export type ReadonlyRecord<K extends PropertyKey, V> = {
  readonly [P in K]: V;
};
