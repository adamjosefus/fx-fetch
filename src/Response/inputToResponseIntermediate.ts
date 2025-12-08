import { Either, Option } from 'effect';
import * as Url from '../Url';
import { inputToUrlIntermediate, urlToUrlIntermediate } from '../Url/inputToUrlIntermediate';
import { UrlIntermediate } from '../Url/UrlIntermediate';
import { cloneHeadersIntermediate } from '../utils/cloneHeadersIntermediate';
import { inputToHeadersIntermediate } from '../utils/inputToHeadersIntermediate';
import { normalizeAndCloneBody } from '../utils/normalizeAndCloneBody';
import { isResponse } from './isResponse';
import * as Response from './Response';
import { ResponseIntermediate } from './ResponseIntermediate';

/**
 * @internal Checks if the given value is a custom "Response.Init" object. This guard is not general purpose
 * and is only used in the context of `Response.Response.Options | Response.Response.Parts` which is a union of three specific types.
 */
function isResponseOptions(
  value: Response.Response.Options | Response.Response.Parts
): value is Response.Response.Options {
  const isObject = typeof value === 'object' && value !== null;
  if (!isObject) {
    return false;
  }

  const hasInit = 'init' in value;
  if (!hasInit) {
    return false;
  }

  const initIsObject = typeof value.init === 'object' && value.init !== null;
  if (!initIsObject) {
    return false;
  }

  return true;
}

/**
 * @internal Checks if the given value is a vanilla Response object.
 */
function isJsResponse(value: unknown): value is globalThis.Response {
  return value instanceof globalThis.Response;
}

function isStatusValid(status: number): boolean {
  return Number.isInteger(status) && status >= 100 && status <= 599;
}

function normalizeRedirected(redirected: boolean | undefined): boolean {
  return redirected ?? false;
}

function normalizeStatus(status: number | undefined): number {
  return status ?? 200;
}

function normalizeStatusText(statusText: string | undefined): string {
  return statusText ?? '';
}

function normalizeType(type: globalThis.ResponseType | undefined): globalThis.ResponseType {
  return type ?? 'default';
}

function normalizeResponseUrlInput(input: Url.Url.Input | undefined): Url.Url.Input | undefined {
  if (input === '') {
    return undefined;
  }

  return input;
}

/**
 * @internal Converts a globalThis.Response to mutable ResponseIntermediate
 * without keeping references to the input object.
 */
function jsResponseToResponseIntermediate(
  jsResponse: globalThis.Response
): Either.Either<ResponseIntermediate, globalThis.Error> {
  if (jsResponse.bodyUsed) {
    return Either.left(new Error('Response cannot be created. Body has already been used.'));
  }

  const parts: Response.Response.Parts = {
    body: jsResponse.body,
    headers: jsResponse.headers,
    redirected: jsResponse.redirected,
    status: jsResponse.status,
    statusText: jsResponse.statusText,
    type: jsResponse.type,
    url: jsResponse.url,
  };

  return partsToResponseIntermediate(parts);
}

/**
 * @internal Converts a Response.Response.Parts to mutable ResponseIntermediate
 * without keeping references to the input object.
 */
function optionsToResponseIntermediate(
  options: Response.Response.Options
): Either.Either<ResponseIntermediate, globalThis.Error> {
  const parts: Response.Response.Parts = {
    body: options.body,
    headers: options.init?.headers,
    redirected: undefined, // globalThis.ResponseInit does not have `redirected` property
    status: options.init?.status,
    statusText: options.init?.statusText,
    type: undefined, // globalThis.ResponseInit does not have `type` property
    url: undefined, // globalThis.ResponseInit does not have `url` property
  };

  return partsToResponseIntermediate(parts);
}

/**
 * @internal Converts a Response.Response.Parts to mutable ResponseIntermediate
 * without keeping references to the input object.
 */
function partsToResponseIntermediate(
  parts: Response.Response.Parts
): Either.Either<ResponseIntermediate, globalThis.Error> {
  const normalizedStatus = normalizeStatus(parts.status);

  if (!isStatusValid(normalizedStatus)) {
    return Either.left(
      new Error(`Response cannot be created. Status code "${parts.status}" is not valid.`)
    );
  }

  const url: Either.Either<UrlIntermediate | undefined, Error> = Option.fromNullable(
    normalizeResponseUrlInput(parts.url)
  ).pipe(
    Option.map((urlInput) => inputToUrlIntermediate(urlInput)),
    Option.getOrElse(() => Either.right(undefined))
  );

  if (Either.isLeft(url)) {
    return Either.left(
      new Error('Response cannot be created. Invalid URL input.', { cause: url.left })
    );
  }

  const intermediate: ResponseIntermediate = {
    clonedBody: normalizeAndCloneBody(parts.body),
    clonedHeaders: inputToHeadersIntermediate(parts.headers),
    clonedUrl: url.right,
    redirected: normalizeRedirected(parts.redirected),
    status: normalizeStatus(normalizedStatus),
    statusText: normalizeStatusText(parts.statusText),
    type: normalizeType(parts.type),
  };

  return Either.right(intermediate);
}

/**
 * @internal Converts a globalThis.Response to mutable ResponseIntermediate
 * without keeping references to the input object.
 */
export function responseToResponseIntermediate(response: Response.Response): ResponseIntermediate {
  return {
    clonedBody: normalizeAndCloneBody(response.body),
    clonedHeaders: cloneHeadersIntermediate(response.headers),
    clonedUrl: response.url ? urlToUrlIntermediate(response.url) : undefined,
    redirected: response.redirected,
    status: response.status,
    statusText: response.statusText,
    type: response.type,
  };
}

/**
 * @internal Converts a Response.Response.Input to mutable ResponseIntermediate
 * without keeping references to the input object.
 */
export function inputToResponseIntermediate(
  input: Response.Response.Input
): Either.Either<ResponseIntermediate, globalThis.Error> {
  if (isResponse(input)) {
    return Either.right(responseToResponseIntermediate(input));
  }

  if (isJsResponse(input)) {
    return jsResponseToResponseIntermediate(input);
  }

  if (isResponseOptions(input)) {
    return optionsToResponseIntermediate(input);
  }

  return partsToResponseIntermediate(input);
}
