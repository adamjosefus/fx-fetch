/**
 * @internal Percent-decodes a component, returning the raw input if it is malformed.
 *
 * `decodeURIComponent` throws a `URIError` on invalid percent-escape sequences
 * — e.g. a lone `%`, `%zz` (non-hex digits), a trailing `100%`, or bytes that
 * form an incomplete surrogate. Such strings appear in real-world URLs whenever
 * a `%` is written literally instead of being encoded as `%25`.
 *
 * Parsing is deliberately tolerant: rather than failing over a single bad
 * character, it degrades gracefully and keeps the component in its raw
 * (undecoded) form. This mirrors how the WHATWG URL parser handles malformed
 * input. The empty `catch {}` swallowing the error is intentional.
 */
export function safeDecodeUriComponent(value: string): string {
  try {
    return globalThis.decodeURIComponent(value);
  } catch {
    return value;
  }
}
