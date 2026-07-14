import type { Inspectable, Pipeable } from 'effect';
import type * as SearchParams from '../Url/SearchParams/SearchParams.js';
import type { Url } from '../Url/Url.js';
import type * as Headers from './Headers/Headers.js';
import type { Method } from './Method.js';

/**
 * @category Symbols
 * @since 0.1.0
 */
export const TypeId = '~fx-fetch/request/Request';

/**
 * @category Symbols
 * @since 0.1.0
 */
export type TypeId = typeof TypeId;

/**
 * The `cache` mode of a request, mirroring the WHATWG Fetch `RequestCache`.
 *
 * @category Models
 * @since 0.1.0
 */
export type RequestCache =
  | 'default'
  | 'force-cache'
  | 'no-cache'
  | 'no-store'
  | 'only-if-cached'
  | 'reload';

/**
 * The `credentials` mode of a request, mirroring the WHATWG Fetch
 * `RequestCredentials`.
 *
 * @category Models
 * @since 0.1.0
 */
export type RequestCredentials = 'include' | 'omit' | 'same-origin';

/**
 * The `mode` of a request, mirroring the WHATWG Fetch `RequestMode`.
 *
 * @category Models
 * @since 0.1.0
 */
export type RequestMode = 'cors' | 'navigate' | 'no-cors' | 'same-origin';

/**
 * The `priority` of a request, mirroring the WHATWG Fetch `RequestPriority`.
 *
 * @category Models
 * @since 0.1.0
 */
export type RequestPriority = 'auto' | 'high' | 'low';

/**
 * The `redirect` mode of a request, mirroring the WHATWG Fetch
 * `RequestRedirect`.
 *
 * @category Models
 * @since 0.1.0
 */
export type RequestRedirect = 'error' | 'follow' | 'manual';

/**
 * The `referrerPolicy` of a request, mirroring the WHATWG Fetch
 * `ReferrerPolicy` (including the empty string accepted on input).
 *
 * @category Models
 * @since 0.1.0
 */
export type ReferrerPolicy =
  | ''
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url';

/**
 * A {@link ReferrerPolicy} without the empty string. The empty string is
 * normalized to `'no-referrer'` when a request is created.
 *
 * @category Models
 * @since 0.1.0
 */
export type NormalizedReferrerPolicy = Exclude<ReferrerPolicy, ''>;

/**
 * @category Models
 * @since 0.1.0
 */
export interface Proto extends Pipeable.Pipeable, Inspectable.Inspectable {
  readonly [TypeId]: TypeId;
}

/**
 * Represents an immutable HTTP request.
 *
 * @category Models
 * @since 0.1.0
 */
export interface Request extends Proto {
  readonly _tag: 'Request';
  readonly cache: RequestCache | undefined;
  readonly credentials: RequestCredentials | undefined;
  readonly headers: Headers.Headers;
  readonly integrity: string | undefined;
  readonly keepalive: boolean;
  readonly method: Method;
  readonly mode: RequestMode | undefined;
  readonly priority: RequestPriority | undefined;
  readonly redirect: RequestRedirect | undefined;
  readonly referrer: string | undefined;
  readonly referrerPolicy: NormalizedReferrerPolicy | undefined;
  readonly url: Url;
}

type Env = {
  readonly searchParams: unknown;
};

export namespace Request {
  /**
   * @category Models
   * @since 0.1.0
   */
  export type Parts<T extends Env> = {
    readonly cache?: RequestCache | undefined;
    readonly credentials?: RequestCredentials | undefined;
    readonly headers?: Headers.Input | undefined;
    readonly integrity?: string | undefined;
    readonly keepalive?: boolean | undefined;
    readonly method?: Method | undefined;
    readonly mode?: RequestMode | undefined;
    readonly priority?: RequestPriority | undefined;
    readonly redirect?: RequestRedirect | undefined;
    readonly referrer?: string | undefined;
    readonly referrerPolicy?: ReferrerPolicy | undefined;
    readonly url: Url.Input<T>;
  };

  /**
   * @category Models
   * @since 0.1.0
   */
  export type Options<T extends Env> = {
    readonly searchParams?: SearchParams.Input<T['searchParams']>;
  } & Parts<T>;

  /**
   * @category Models
   * @since 0.1.0
   */
  export type Input<T extends Env> = Request | Parts<T> | Options<T> | string;
}
