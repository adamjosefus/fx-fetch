import { Pipeable } from 'effect';
import * as Url from '../Url';
import { BodyInput } from '../utils/BodyInput';
import { Headers } from '../utils/Headers';
import { HeadersInput } from '../utils/HeadersInput';

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
interface Proto extends Pipeable.Pipeable {
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
  readonly type: globalThis.ResponseType;
  readonly url: Url.Url | undefined;
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
    readonly type?: globalThis.ResponseType;
    readonly url?: Url.Url.Input;
  };

  /**
   * @category Models
   * @since 0.1.0
   */
  export type Options = {
    readonly body?: BodyInput;
    readonly init?: globalThis.ResponseInit;
  };

  /**
   * @category Models
   * @since 0.1.0
   */
  export type Input = Response | Parts | Options | globalThis.Response;
}
