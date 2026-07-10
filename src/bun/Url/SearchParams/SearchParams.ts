import {
  type Input as BaseInput,
  type SearchParams,
  type Value,
} from '../../../core/Url/SearchParams/index.js';

export type { SearchParams, Value };

/**
 * @category Models
 * @since 2.0.0
 */
export type Input = BaseInput<globalThis.URLSearchParams>;
