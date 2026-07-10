/**
 * Structural shims for the `URL` and `URLSearchParams` global constructors'
 * instance shapes, used so `src/universal` can typecheck under `lib:
 * ["esnext"]` alone with no `dom`, `@types/node`, or `@types/bun` ambient
 * types in scope. At runtime the real global `URL`/`URLSearchParams`
 * constructors are always present (Node 18+, Bun, every browser), so no
 * runtime shim is required — only the compile-time type needs to exist.
 *
 * @category Models
 * @since 2.0.0
 */
export interface UniversalURL {
  readonly hash: string;
  readonly host: string;
  readonly hostname: string;
  readonly href: string;
  readonly origin: string;
  readonly password: string;
  readonly pathname: string;
  readonly port: string;
  readonly protocol: string;
  readonly search: string;
  readonly searchParams: UniversalURLSearchParams;
  readonly username: string;
  toString(): string;
  toJSON(): string;
}

/**
 * @category Models
 * @since 2.0.0
 */
export interface UniversalURLSearchParams {
  append(name: string, value: string): void;
  delete(name: string, value?: string): void;
  get(name: string): string | null;
  getAll(name: string): string[];
  has(name: string, value?: string): boolean;
  set(name: string, value: string): void;
  sort(): void;
  toString(): string;
  readonly size: number;
  entries(): IterableIterator<[string, string]>;
  keys(): IterableIterator<string>;
  values(): IterableIterator<string>;
  forEach(callbackfn: (value: string, key: string, parent: UniversalURLSearchParams) => void): void;
  [Symbol.iterator](): IterableIterator<[string, string]>;
}
