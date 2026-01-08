import type { SearchParamValueInput } from './SearchParamValueInput';

/**
 * @internal Represents all possible inputs for URL search parameters.
 */
export type SearchParamsInput =
  | { readonly [key: string]: SearchParamValueInput }
  | globalThis.URLSearchParams
  | readonly (readonly [key: string, value: SearchParamValueInput])[]
  | ReadonlyMap<string, SearchParamValueInput>
  | string;
