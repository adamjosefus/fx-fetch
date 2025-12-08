/**
 * @internal Determines if the provided value is an instance of globalThis.URLSearchParams.
 */
export function isJsUrlSearchParams<T extends globalThis.URLSearchParams>(
  urlSearchParams: T | unknown
): urlSearchParams is T {
  return urlSearchParams instanceof globalThis.URLSearchParams;
}
