import { TaggedError } from 'effect/Data';

/**
 * Thrown if the request is not valid `ArrayBuffer`.
 *
 * @category Errors
 * @since 0.1.0
 */
export class MalformedArrayBufferError extends TaggedError('MalformedArrayBufferError')<{
  message: string;
  cause: unknown;
}> {}

/**
 * Thrown if the request is not valid `Blob`.
 *
 * @category Errors
 * @since 0.1.0
 */
export class MalformedBlobError extends TaggedError('MalformedBlobError')<{
  message: string;
  cause: unknown;
}> {}

/**
 * Thrown if the request is not valid `Blob`.
 *
 * @category Errors
 * @since 0.1.0
 */
export class MalformedReadableStreamError extends TaggedError('MalformedReadableStreamError')<{
  message: string;
  cause: unknown;
}> {}

/**
 * Thrown if the request is not valid `FormData`.
 *
 * @category Errors
 * @since 0.1.0
 */
export class MalformedBytesError extends TaggedError('MalformedBytesError')<{
  message: string;
  cause: unknown;
}> {}

/**
 * Thrown if the request is not valid `FormData`.
 *
 * @category Errors
 * @since 0.1.0
 */
export class MalformedFormDataError extends TaggedError('MalformedFormDataError')<{
  message: string;
  cause: unknown;
}> {}

/**
 * Thrown if the request is not valid `JSON`.
 *
 * @category Errors
 * @since 0.1.0
 */
export class MalformedJsonError extends TaggedError('MalformedJsonError')<{
  message: string;
  cause: unknown;
}> {}

/**
 * Thrown if the request is not valid text.
 *
 * @category Errors
 * @since 0.1.0
 */
export class MalformedTextError extends TaggedError('MalformedTextError')<{
  message: string;
  cause: unknown;
}> {}

/**
 * Thrown if the request is not valid text.
 *
 * @category Errors
 * @since 0.1.0
 */
export class BodyIsNotPresentError extends TaggedError('BodyIsNotPresentError')<{
  message: string;
}> {}
