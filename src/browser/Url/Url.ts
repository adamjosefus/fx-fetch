import { type Url as BaseUrl, TypeId } from '../../shared/Url/index.js';

export { TypeId };

type Env = {
  readonly searchParams: globalThis.URLSearchParams;
};

/**
 * Represents immutable URL.
 *
 * @category Models
 * @since 2.0.0
 */
export interface Url extends BaseUrl {}

export namespace Url {
  /**
   * @category Models
   * @since 2.0.0
   */
  export type Parts = BaseUrl.Parts<Env>;

  /**
   * @category Models
   * @since 2.0.0
   */
  export type Options = BaseUrl.Options<Env>;

  /**
   * @category Models
   * @since 2.0.0
   */
  export type Input = BaseUrl.Input<Env> | globalThis.URL;
}
