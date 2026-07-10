import type { Pipeable } from 'effect/Pipeable';
import type * as SearchParams from './SearchParams/SearchParams.js';

/**
 * @category Symbols
 * @since 2.0.0
 */
export const TypeId: unique symbol = Symbol.for('fx-fetch/Url');

/**
 * @category Symbols
 * @since 2.0.0
 */
export type TypeId = typeof TypeId;

/**
 * @category Models
 * @since 2.0.0
 */
interface Proto extends Pipeable {
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

type Env = {
  readonly searchParams: unknown;
};

export namespace Url {
  /**
   * @category Models
   * @since 2.0.0
   */
  export type Parts<T extends Env> = {
    readonly hash?: string;
    readonly hostname: string;
    readonly password?: string;
    readonly pathname?: string;
    readonly port?: string | number;
    readonly protocol: string;
    readonly searchParams?: SearchParams.Input<T['searchParams']>;
    readonly username?: string;
  };

  /**
   * @category Models
   * @since 2.0.0
   */
  export type Options<T extends Env> = {
    readonly url: string;
    readonly searchParams?: SearchParams.Input<T['searchParams']>;
  };

  /**
   * @category Models
   * @since 2.0.0
   */
  export type Input<T extends Env> = Url | Parts<T> | Options<T> | string;
}
