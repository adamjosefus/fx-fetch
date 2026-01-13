import type * as localThis from './localThis';

/**
 * @internal Determines if the provided value is an instance of globalThis.URL.
 */
export function isJsUrl<T extends localThis.URL>(url: T | unknown): url is T {
  return url instanceof globalThis.URL;
}
