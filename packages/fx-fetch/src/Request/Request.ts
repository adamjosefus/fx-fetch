import { Pipeable } from 'effect';
import * as Url from '../Url';
import { SearchParamsInput } from '../Url/SearchParamsInput';
import { BodyInput } from '../utils/BodyInput';
import { Headers } from '../utils/Headers';
import { HeadersInput } from '../utils/HeadersInput';
import { Method } from './Method';
import { NormalizedReferrerPolicy } from './NormalizedReferrerPolicy';

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
interface Proto extends Pipeable.Pipeable {
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
  readonly cache: globalThis.RequestCache | undefined;
  readonly credentials: globalThis.RequestCredentials | undefined;
  readonly headers: Headers;
  readonly integrity: string | undefined;
  readonly keepalive: boolean;
  readonly method: Method;
  readonly mode: globalThis.RequestMode | undefined;
  readonly priority: globalThis.RequestPriority | undefined;
  readonly redirect: globalThis.RequestRedirect | undefined;
  readonly referrer: string | undefined;
  readonly referrerPolicy: NormalizedReferrerPolicy | undefined;
  readonly signals: readonly globalThis.AbortSignal[];
  readonly url: Url.Url;
}

export namespace Request {
  /**
   * @category Models
   * @since 0.1.0
   */
  export type Parts = {
    readonly body?: BodyInput;
    readonly cache?: RequestCache;
    readonly credentials?: RequestCredentials;
    readonly headers?: HeadersInput;
    readonly integrity?: string;
    readonly keepalive?: boolean;
    readonly method?: string;
    readonly mode?: RequestMode;
    readonly priority?: RequestPriority;
    readonly redirect?: RequestRedirect;
    readonly referrer?: string;
    readonly referrerPolicy?: NormalizedReferrerPolicy;
    readonly signal?: AbortSignal;
    readonly url: Url.Url.Input;
  };

  /**
   * @category Models
   * @since 0.1.0
   */
  export type Options = {
    readonly url: Url.Url.Input;
    readonly searchParams?: SearchParamsInput;
    readonly init?: globalThis.RequestInit;
  };

  /**
   * @category Models
   * @since 0.1.0
   */
  export type Input = Request | Parts | Options | globalThis.Request;
}
