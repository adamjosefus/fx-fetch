/**
 * @internal Converts an HTTP status code to a boolean indicating whether the response is OK (2xx).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
 */
export function statusToOk(status: number): boolean {
  return status >= 200 && status <= 299;
}
