import { absurd, Cause, Either } from 'effect';
import { inputToUrlIntermediate, urlToUrlIntermediate } from '../Url/inputToUrlIntermediate';
import { inputToSearchParamsIntermediate } from '../Url/SearchParamsIntermediate';
import { cloneHeadersIntermediate } from '../utils/cloneHeadersIntermediate';
import { inputToHeadersIntermediate } from '../utils/inputToHeadersIntermediate';
import { isArray } from '../utils/isArray';
import { normalizeAndCloneBody } from '../utils/normalizeAndCloneBody';
import { classifyRequestInput } from './classifyRequestInput';
import { isMethod, Method } from './Method';
import { NormalizedReferrerPolicy } from './NormalizedReferrerPolicy';
import * as Request from './Request';
import { RequestIntermediate } from './RequestIntermediate';

/**
 * @internal We clone just the array of signals. Not signals themselves, because we want keep the same abort behavior.
 */
function normalizeAndCloneSignals(
  value: AbortSignal | readonly AbortSignal[] | undefined
): RequestIntermediate['clonedSignals'] {
  if (value === undefined) {
    return [];
  }

  if (isArray(value)) {
    return [...value]; // clone the array to avoid external mutations
  }

  return [value];
}

function normalizeMethod(method: string | undefined): string {
  if (method === undefined) {
    return 'GET';
  }

  return method.trim().toUpperCase();
}

function normalizeKeepalive(keepalive: boolean | undefined): boolean {
  return keepalive ?? false; // default to false if undefined
}

function normalizeReferrerPolicy(
  referrerPolicy: globalThis.ReferrerPolicy | undefined
): NormalizedReferrerPolicy | undefined {
  if (referrerPolicy === undefined) {
    return undefined;
  }

  if (referrerPolicy === '') {
    return 'no-referrer';
  }

  return referrerPolicy;
}

function isMethodValid(method: unknown): method is Method {
  return isMethod(method);
}

/**
 * @internal Converts globalThis.Request to mutable RequestIntermediate
 * without keeping references to the input object.
 */
function jsRequestToRequestIntermediate(
  jsRequest: globalThis.Request
): Either.Either<RequestIntermediate, Cause.IllegalArgumentException> {
  if (jsRequest.bodyUsed) {
    return Either.left(
      new Cause.IllegalArgumentException('Request cannot be created. Body has already been used.')
    );
  }

  const url = inputToUrlIntermediate(jsRequest.url);
  if (Either.isLeft(url)) {
    return Either.left(
      new Cause.IllegalArgumentException('Request cannot be created. Invalid URL input.')
    );
  }

  const normalizedMethod = normalizeMethod(jsRequest.method);
  if (!isMethodValid(normalizedMethod)) {
    return Either.left(
      new Cause.IllegalArgumentException(
        `Request cannot be created. Invalid HTTP method: "${normalizedMethod}".`
      )
    );
  }

  const headers = inputToHeadersIntermediate(jsRequest.headers);

  const request: RequestIntermediate = {
    cache: jsRequest.cache,
    clonedBody: normalizeAndCloneBody(jsRequest.body),
    clonedHeaders: headers,
    clonedSignals: normalizeAndCloneSignals(jsRequest.signal ?? undefined),
    clonedUrl: url.right,
    credentials: jsRequest.credentials,
    integrity: jsRequest.integrity,
    keepalive: normalizeKeepalive(jsRequest.keepalive),
    method: normalizedMethod,
    mode: jsRequest.mode,
    priority: undefined, // RequestPriority is not part of the standard globalThis.Request
    redirect: jsRequest.redirect,
    referrer: jsRequest.referrer,
    referrerPolicy: normalizeReferrerPolicy(jsRequest.referrerPolicy),
  };

  return Either.right(request);
}

function optionsToRequestIntermediate(
  options: Request.Request.Options
): Either.Either<RequestIntermediate, Cause.IllegalArgumentException> {
  const additionalSearchParams = inputToSearchParamsIntermediate(options.searchParams);
  const url = inputToUrlIntermediate(options.url).pipe(
    Either.map((url) => {
      for (const [key, values] of additionalSearchParams) {
        for (const value of values) {
          const list = url.clonedSearchParams.get(key) ?? [];
          list.push(value);

          url.clonedSearchParams.set(key, list);
        }
      }

      return url;
    })
  );

  if (Either.isLeft(url)) {
    return Either.left(
      new Cause.IllegalArgumentException('Request cannot be created. Invalid URL input.')
    );
  }

  const normalizedMethod = normalizeMethod(options.init?.method);
  if (!isMethodValid(normalizedMethod)) {
    return Either.left(
      new Cause.IllegalArgumentException(
        `Request cannot be created. Invalid HTTP method: "${normalizedMethod}".`
      )
    );
  }

  const headers = inputToHeadersIntermediate(options.init?.headers);

  const request: RequestIntermediate = {
    cache: options.init?.cache,
    clonedBody: normalizeAndCloneBody(options.init?.body),
    clonedHeaders: headers,
    clonedSignals: normalizeAndCloneSignals(options.init?.signal ?? undefined),
    clonedUrl: url.right,
    credentials: options.init?.credentials,
    integrity: options.init?.integrity,
    keepalive: normalizeKeepalive(options.init?.keepalive),
    method: normalizedMethod,
    mode: options.init?.mode,
    priority: options.init?.priority,
    redirect: options.init?.redirect,
    referrer: options.init?.referrer,
    referrerPolicy: normalizeReferrerPolicy(options.init?.referrerPolicy),
  };

  return Either.right(request);
}

/**
 * @internal Converts Request.Parts to mutable RequestIntermediate
 * without keeping references to the input object.
 */
function partsToRequestIntermediate(
  parts: Request.Request.Parts
): Either.Either<RequestIntermediate, Cause.IllegalArgumentException> {
  const url = inputToUrlIntermediate(parts.url);

  if (Either.isLeft(url)) {
    return Either.left(
      new Cause.IllegalArgumentException('Request cannot be created. Invalid URL input.')
    );
  }

  const normalizedMethod = normalizeMethod(parts.method);
  if (!isMethodValid(normalizedMethod)) {
    return Either.left(
      new Cause.IllegalArgumentException(
        `Request cannot be created. Invalid HTTP method: "${normalizedMethod}".`
      )
    );
  }

  const headers = inputToHeadersIntermediate(parts.headers);

  const request: RequestIntermediate = {
    cache: parts.cache,
    clonedBody: normalizeAndCloneBody(parts.body),
    clonedHeaders: headers,
    clonedSignals: normalizeAndCloneSignals(parts.signal),
    clonedUrl: url.right,
    credentials: parts.credentials,
    integrity: parts.integrity,
    keepalive: normalizeKeepalive(parts.keepalive),
    method: normalizedMethod,
    mode: parts.mode,
    priority: parts.priority,
    redirect: parts.redirect,
    referrer: parts.referrer,
    referrerPolicy: normalizeReferrerPolicy(parts.referrerPolicy),
  };

  return Either.right(request);
}

/**
 * @internal Converts a Request.Request to mutable RequestIntermediate
 * without keeping references to the input object.
 */
export function requestToRequestIntermediate(request: Request.Request): RequestIntermediate {
  return {
    cache: request.cache,
    clonedBody: normalizeAndCloneBody(request.body),
    clonedHeaders: cloneHeadersIntermediate(request.headers),
    clonedSignals: normalizeAndCloneSignals(request.signals),
    clonedUrl: urlToUrlIntermediate(request.url),
    credentials: request.credentials,
    integrity: request.integrity,
    keepalive: request.keepalive,
    method: request.method, // Method from Request.Request is always valid
    mode: request.mode,
    priority: request.priority,
    redirect: request.redirect,
    referrer: request.referrer,
    referrerPolicy: request.referrerPolicy,
  };
}

/**
 * @internal Converts a Request.Request.Input to mutable RequestIntermediate
 * without keeping references to the input object.
 */
export function inputToRequestIntermediate(
  input: Request.Request.Input
): Either.Either<RequestIntermediate, Cause.IllegalArgumentException> {
  const classified = classifyRequestInput(input);

  switch (classified.type) {
    case 'request': {
      return Either.right(requestToRequestIntermediate(classified.input));
    }

    case 'jsRequest': {
      return jsRequestToRequestIntermediate(classified.input);
    }

    case 'options': {
      return optionsToRequestIntermediate(classified.input);
    }

    case 'parts': {
      return partsToRequestIntermediate(classified.input);
    }

    default: {
      return absurd(classified);
    }
  }
}
