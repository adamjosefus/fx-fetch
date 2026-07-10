import { type Url as BaseUrl, TypeId } from '../../core/Url/index.js';
import type { UniversalURL, UniversalURLSearchParams } from '../lib/uri-shim.js';

export { TypeId };

type Env = {
  readonly searchParams: UniversalURLSearchParams;
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
  export type Input = BaseUrl.Input<Env> | UniversalURL;
}
