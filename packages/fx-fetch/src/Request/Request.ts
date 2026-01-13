import type { Pipeable } from 'effect/Pipeable';
import type { Url } from '../Url';
import type { SearchParamsInput } from '../Url/SearchParamsInput';
import type { BodyInput } from '../utils/BodyInput';
import type { Headers } from '../utils/Headers';
import type { HeadersInput } from '../utils/HeadersInput';
import type * as localThis from '../utils/localThis';
import type { Method } from './Method';
import type { NormalizedReferrerPolicy } from './NormalizedReferrerPolicy';

/**
 * @category Symbols
 * @since 0.1.0
 */
export const TypeId: unique symbol = Symbol.for('fx-fetch/Request');

/**
 * @category Symbols
 * @since 0.1.0
 */
export type TypeId = typeof TypeId;

/**
 * @category Models
 * @since 0.1.0
 */
interface Proto extends Pipeable {
  readonly [TypeId]: TypeId;
}

/**
 * Represents immutable HTTP request.
 *
 * @category Models
 * @since 0.1.0
 */
export interface Request extends Proto {
  readonly _tag: 'Request';
  readonly body: Promise<Blob> | undefined;
  readonly cache: localThis.RequestCache | undefined;
  readonly credentials: localThis.RequestCredentials | undefined;
  readonly headers: Headers;
  readonly integrity: string | undefined;
  readonly keepalive: boolean;
  readonly method: Method;
  readonly mode: localThis.RequestMode | undefined;
  readonly priority: localThis.RequestPriority | undefined;
  readonly redirect: localThis.RequestRedirect | undefined;
  readonly referrer: string | undefined;
  readonly referrerPolicy: NormalizedReferrerPolicy | undefined;
  readonly signals: readonly localThis.AbortSignal[];
  readonly url: Url;
}

export namespace Request {
  /**
   * @category Models
   * @since 0.1.0
   */
  export type Parts = {
    readonly body?: BodyInput;
    readonly cache?: localThis.RequestCache;
    readonly credentials?: localThis.RequestCredentials;
    readonly headers?: HeadersInput;
    readonly integrity?: string;
    readonly keepalive?: boolean;
    readonly method?: string;
    readonly mode?: localThis.RequestMode;
    readonly priority?: localThis.RequestPriority;
    readonly redirect?: localThis.RequestRedirect;
    readonly referrer?: string;
    readonly referrerPolicy?: localThis.ReferrerPolicy;
    readonly signal?: localThis.AbortSignal;
    readonly url: Url.Input;
  };

  /**
   * @category Models
   * @since 0.1.0
   */
  export type Options = {
    readonly searchParams?: SearchParamsInput;
  } & Parts;

  /**
   * @category Models
   * @since 0.1.0
   */
  export type Input = Request | Parts | Options | localThis.Request;
}
