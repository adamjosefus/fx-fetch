import type { Pipeable } from 'effect/Pipeable';
import type { Url } from '../Url';
import type { BodyInput } from '../utils/BodyInput';
import type { Headers } from '../utils/Headers';
import type { HeadersInput } from '../utils/HeadersInput';
import type * as localThis from '../utils/localThis';

/**
 * @category Symbols
 * @since 0.1.0
 */
export const TypeId: unique symbol = Symbol.for('fx-fetch/Response');

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
 * Represents immutable HTTP response.
 *
 * @category Models
 * @since 0.1.0
 */
export interface Response extends Proto {
  readonly _tag: 'Response';
  readonly body: Promise<Blob> | undefined;
  readonly headers: Headers;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: localThis.ResponseType;
  readonly url: Url | undefined;
}

export namespace Response {
  /**
   * @category Models
   * @since 0.1.0
   */
  export type Parts = {
    readonly body?: BodyInput;
    readonly headers?: HeadersInput;
    readonly redirected?: boolean;
    readonly status?: number;
    readonly statusText?: string;
    readonly type?: localThis.ResponseType;
    readonly url?: Url.Input;
  };

  /**
   * @category Models
   * @since 0.1.0
   * @deprecated Use `Parts` instead. In next major release `Options` will be removed.
   */
  export type Options = {
    readonly body?: BodyInput;
    readonly init?: localThis.ResponseInit;
  };

  /**
   * @category Models
   * @since 0.1.0
   */
  export type Input = Response | Parts | Options | localThis.Response;
}
