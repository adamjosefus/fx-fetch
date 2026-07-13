import {
  type Input as CoreInput,
  type SearchParams,
  type Value,
  type ValueElement,
} from '../../../core/Url/SearchParams/SearchParams.js';

export type { SearchParams, Value, ValueElement };

/**
 * @category Models
 * @since 2.0.0
 */
export type Input = CoreInput<globalThis.URLSearchParams>;
