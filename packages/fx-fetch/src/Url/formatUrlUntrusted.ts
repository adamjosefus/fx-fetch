import { SearchParamsIntermediate } from './SearchParamsIntermediate';
import { UrlIntermediate } from './UrlIntermediate';

function createJsSearchParams(searchParams: SearchParamsIntermediate): globalThis.URLSearchParams {
  const jsSearchParams = new globalThis.URLSearchParams();

  for (const [key, values] of searchParams) {
    for (const value of values) {
      jsSearchParams.append(key, value);
    }
  }

  return jsSearchParams;
}

// TODO: add tests

/**
 * @internal Formats a UrlIntermediate into a URL string. Outputs a best-effort string representation of the URL. Does not guarantee a valid URL string.
 */
export function formatUrlUntrusted(url: UrlIntermediate): string {
  const searchParams = createJsSearchParams(url.clonedSearchParams);

  const urlString = [
    url.protocol,
    '//',
    url.username !== undefined ? url.username : '',
    url.password !== undefined ? `:${url.password}` : '',
    url.username !== undefined ? '@' : '',
    url.hostname,
    url.port !== undefined ? `:${url.port}` : '',
    url.pathname !== undefined ? `/${url.pathname}` : '',
    url.clonedSearchParams.size > 0 ? `?${searchParams.toString()}` : '',
    url.hash !== undefined ? `#${url.hash}` : '',
  ].join('');

  return urlString;
}
