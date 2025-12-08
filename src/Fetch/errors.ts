import { Data } from 'effect';

/**
 * Wrap for TypeError. It is al most impossible to categorize all possible errors. Because it depends on the environment (browser, nodejs, deno, etc), location, network, etc.
 *
 * Possible reasons:
 *
 * - Blocked by a permissions policy.
 * - Invalid header name.
 * - Invalid header value. The header object must contain exactly two elements.
 * - Invalid URL or scheme, or using a scheme that fetch does not support, or using a scheme that is not supported for a particular request mode.
 * - URL includes credentials.
 * - Invalid referrer URL.
 * - Invalid modes (`navigate` and `websocket`).
 * - If the request cache mode is "only-if-cached" and the request mode is other than "same-origin".
 * - If the request method is an invalid name token or one of the forbidden headers (`'CONNECT'`, `'TRACE'` or `'TRACK'`).
 * - If the request mode is "no-cors" and the request method is not a CORS-safe-listed method (`'GET'`, `'HEAD'`, or `'POST'`).
 * - If the request method is `'GET'` or `'HEAD'` and the body is non-null or not undefined.
 * - If fetch throws a network error.
 *
 * @category Errors
 * @since 0.1.0
 */
export class FetchError extends Data.TaggedError('FetchError')<{
  message: string;
  cause: TypeError;
}> {}

/**
 * The request was aborted due to a call to the [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) [`abort()`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort "abort()") method.
 *
 * @category Errors
 * @since 0.1.0
 */
export class AbortError extends Data.TaggedError('AbortError')<{
  message: string;
  cause: unknown;
}> {}

/**
 * Thrown if use of the [Topics API](https://developer.mozilla.org/en-US/docs/Web/API/Topics_API) is specifically disallowed by a [`browsing-topics`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/browsing-topics) [Permissions Policy](/en-US/docs/Web/HTTP/Permissions_Policy),
 * and a `fetch()` request was made with `browsingTopics: true`.
 *
 * @category Errors
 * @since 0.1.0
 */
export class NotAllowedError extends Data.TaggedError('NotAllowedError')<{
  message: string;
  cause: unknown;
}> {}
