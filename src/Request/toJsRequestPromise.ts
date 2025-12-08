import * as Url from '../Url';
import { headersToJsHeaders } from '../utils/headersToJsHeaders';
import { resolveBlobOrThrow } from '../utils/resolveBlobOrThrow';
import * as Request from './Request';

function combineAbortSignals(
  signals: readonly AbortSignal[],
  signal: AbortSignal | undefined
): AbortSignal {
  const allSignals = [...signals];

  if (signal !== undefined) {
    allSignals.push(signal);
  }

  return AbortSignal.any(allSignals);
}

type Options = {
  readonly signal?: AbortSignal;
};

/**
 * Converts a Request to a native JavaScript Request promise.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com' });
 * const jsRequest = await Request.toJsRequestPromise(request);
 * ```
 *
 * @category Conversions
 * @since 0.1.0
 */
export async function toJsRequestPromise(self: Request.Request, options?: Options) {
  const url = Url.toJsUrl(self.url);
  const body = self.body !== undefined ? await resolveBlobOrThrow(self.body) : null;
  const signal = combineAbortSignals(self.signals, options?.signal);

  return new globalThis.Request(url, {
    body,
    cache: self.cache,
    credentials: self.credentials,
    headers: headersToJsHeaders(self.headers),
    integrity: self.integrity,
    keepalive: self.keepalive,
    method: self.method,
    mode: self.mode,
    priority: self.priority,
    redirect: self.redirect,
    referrer: self.referrer,
    referrerPolicy: self.referrerPolicy,
    signal,
  });
}
