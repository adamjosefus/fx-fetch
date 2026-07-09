import { type Url as BaseUrl, TypeId } from '../../shared/Url/index.js';
import type * as SearchParams from './SearchParams/SearchParams.js';

export { TypeId };

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
  export interface Parts extends BaseUrl.Parts {
    readonly searchParams?: SearchParams.Input;
  }

  /**
   * @category Models
   * @since 2.0.0
   */
  export type Input = BaseUrl.Input | globalThis.URL;
}
