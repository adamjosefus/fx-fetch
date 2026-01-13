import type * as localThis from './localThis';

/**
 * @internal Determines if the provided value is an instance of globalThis.URLSearchParams.
 */
export function isJsUrlSearchParams<T extends localThis.URLSearchParams>(
  urlSearchParams: T | unknown
): urlSearchParams is T {
  return urlSearchParams instanceof globalThis.URLSearchParams;
}
