import { inputToIntermediate as urlInputToIntermediate } from '../../Url/intermediate/inputToIntermediate.js';
import { inputToIntermediate as searchParamsInputToIntermediate } from '../../Url/SearchParams/intermediate/inputToIntermediate.js';
import { headersToIntermediate } from '../Headers/intermediate/headersToIntermediate.js';
import { inputToIntermediate as headersInputToIntermediate } from '../Headers/intermediate/inputToIntermediate.js';
import { isRequest } from '../isRequest.js';
import type { Request } from '../Request.js';
import type { $Request } from './$Request.js';

function normalizeMethod(method: string | undefined): $Request['method'] {
  if (method === undefined) {
    return 'GET';
  }

  const normalized = method.trim().toUpperCase();
  return normalized === '' ? 'GET' : normalized;
}

function normalizeReferrerPolicy(
  policy: ReferrerPolicy | undefined
): $Request['referrerPolicy'] | undefined {
  if (policy === undefined) {
    return undefined;
  }

  // The empty string is the "default" policy — normalize it to `no-referrer`.
  return policy === '' ? 'no-referrer' : policy;
}

function partsToIntermediate(parts: Request.Parts): $Request {
  return {
    cache: parts.cache,
    credentials: parts.credentials,
    headers: headersInputToIntermediate(parts.headers ?? {}),
    integrity: parts.integrity,
    keepalive: parts.keepalive ?? false,
    method: normalizeMethod(parts.method),
    mode: parts.mode,
    priority: parts.priority,
    redirect: parts.redirect,
    referrer: parts.referrer,
    referrerPolicy: normalizeReferrerPolicy(parts.referrerPolicy),
    url: urlInputToIntermediate(parts.url),
  };
}

function optionsToIntermediate(options: Request.Options<never>): $Request {
  const intermediate = partsToIntermediate(options);

  if (options.searchParams !== undefined) {
    for (const [key, values] of searchParamsInputToIntermediate(options.searchParams)) {
      const list = intermediate.url.searchParams.get(key) ?? [];
      list.push(...values);
      intermediate.url.searchParams.set(key, list);
    }
  }

  return intermediate;
}

function requestToIntermediate(request: Request): $Request {
  return {
    cache: request.cache,
    credentials: request.credentials,
    headers: headersToIntermediate(request.headers),
    integrity: request.integrity,
    keepalive: request.keepalive,
    method: request.method,
    mode: request.mode,
    priority: request.priority,
    redirect: request.redirect,
    referrer: request.referrer,
    referrerPolicy: request.referrerPolicy,
    url: urlInputToIntermediate(request.url),
  };
}

function isOptions(input: Request.Parts | Request.Options): input is Request.Options {
  return 'searchParams' in input;
}

/**
 * @internal Normalizes any Request input into the intermediate representation.
 * A bare string is treated as the request `url`.
 */
export function inputToIntermediate(input: Request.Input): $Request {
  if (isRequest(input)) {
    return requestToIntermediate(input);
  }

  if (typeof input === 'string') {
    return partsToIntermediate({ url: input });
  }

  if (isOptions(input)) {
    return optionsToIntermediate(input);
  }

  return partsToIntermediate(input);
}
