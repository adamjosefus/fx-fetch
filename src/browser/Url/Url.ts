import type { Inspectable, Pipeable } from 'effect';
import type * as SearchParams from './SearchParams/SearchParams.js';

/**
 * @category Symbols
 * @since 0.1.0
 */
export const TypeId = '~fx-fetch/url/Url';

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
 * Represents immutable URL.
 *
 * @category Models
 * @since 2.0.0
 */
export interface Url extends Proto {
  readonly _tag: 'Url';
  readonly hash: string | undefined;
  readonly hostname: string;
  readonly password: string | undefined;
  readonly pathname: string | undefined;
  readonly port: number | undefined;
  readonly protocol: string;
  readonly searchParams: SearchParams.SearchParams;
  readonly username: string | undefined;
}

export namespace Url {
  /**
   * @category Models
   * @since 2.0.0
   */
  export type Parts = {
    readonly hash?: string | undefined;
    readonly hostname: string;
    readonly password?: string | undefined;
    readonly pathname?: string | undefined;
    readonly port?: string | number | undefined;
    readonly protocol: string;
    readonly searchParams?: SearchParams.Input | undefined;
    readonly username?: string | undefined;
  };

  /**
   * @category Models
   * @since 2.0.0
   */
  export type Options = {
    readonly url: string;
    readonly searchParams?: SearchParams.Input;
  };

  /**
   * @category Models
   * @since 2.0.0
   */
  export type Input = Url | Parts | Options | string | globalThis.URL;
}
