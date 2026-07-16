import type { Inspectable, Pipeable } from 'effect';
import type * as SearchParams from '../Url/SearchParams/SearchParams.js';
import type { Url } from '../Url/Url.js';
import type * as Headers from './Headers/Headers.js';

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
  /**
   * @default `"default"`
   */
  readonly cache: globalThis.RequestCache;
  /**
   * @default `"same-origin"`
   */
  readonly credentials: globalThis.RequestCredentials;
  /**
   * @default `undefined`
   */
  readonly destination: Exclude<globalThis.RequestDestination, ''> | undefined;
  readonly headers: Headers.Headers;
  /**
   * @default `undefined`
   */
  readonly integrity: string | undefined;
  /**
   * @default `false`
   */
  readonly keepalive: boolean;
  /**
   * @default `"GET"`
   */
  readonly method: string;
  /**
   * @default `"cors"`
   */
  readonly mode: globalThis.RequestMode;
  /**
   * @default `"follow"`
   */
  readonly redirect: globalThis.RequestRedirect;
  /**
   * @default `undefined`
   */
  readonly referrerPolicy: Exclude<globalThis.ReferrerPolicy, ''> | undefined;
  readonly referrer: string | undefined;
  readonly url: Url;
}

type KnownMethod =
  | 'CONNECT'
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PUT'
  | 'QUERY'
  | 'TRACE';

type UnknownMethod = string & {};

export namespace Request {
  /**
   * @category Models
   * @since 0.1.0
   */
  export type Parts = {
    readonly cache?: RequestCache | undefined;
    readonly credentials?: RequestCredentials | undefined;
    readonly headers?: Headers.Input | undefined;
    readonly integrity?: string | undefined;
    readonly keepalive?: boolean | undefined;
    readonly method?: KnownMethod | UnknownMethod | undefined;
    readonly mode?: RequestMode | undefined;
    readonly priority?: RequestPriority | undefined;
    readonly redirect?: RequestRedirect | undefined;
    readonly referrer?: string | undefined;
    readonly referrerPolicy?: ReferrerPolicy | undefined;
    readonly url: Url.Input;
  };

  /**
   * @category Models
   * @since 0.1.0
   */
  export type Options = {
    readonly url: Url.Input;
    readonly searchParams?: SearchParams.Input;
  };

  /**
   * @category Models
   * @since 0.1.0
   */
  export type Input = Request | Parts | Options | string;
}
