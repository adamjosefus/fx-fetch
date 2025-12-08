import { Data } from 'effect';

/**
 * Thrown if the request is not valid `ArrayBuffer`.
 *
 * @category Errors
 * @since 0.1.0
 */
export class MalformedArrayBufferError extends Data.TaggedError('MalformedArrayBufferError')<{
  message: string;
  cause: unknown;
}> {}

/**
 * Thrown if the request is not valid `Blob`.
 *
 * @category Errors
 * @since 0.1.0
 */
export class MalformedBlobError extends Data.TaggedError('MalformedBlobError')<{
  message: string;
  cause: unknown;
}> {}

/**
 * Thrown if the request is not valid `Blob`.
 *
 * @category Errors
 * @since 0.1.0
 */
export class MalformedReadableStreamError extends Data.TaggedError('MalformedStreamError')<{
  message: string;
  cause: unknown;
}> {}

/**
 * Thrown if the request is not valid `FormData`.
 *
 * @category Errors
 * @since 0.1.0
 */
export class MalformedBytesError extends Data.TaggedError('MalformedBytesError')<{
  message: string;
  cause: unknown;
}> {}

/**
 * Thrown if the request is not valid `FormData`.
 *
 * @category Errors
 * @since 0.1.0
 */
export class MalformedFormDataError extends Data.TaggedError('MalformedFormDataError')<{
  message: string;
  cause: unknown;
}> {}

/**
 * Thrown if the request is not valid `JSON`.
 *
 * @category Errors
 * @since 0.1.0
 */
export class MalformedJsonError extends Data.TaggedError('MalformedJsonError')<{
  message: string;
  cause: unknown;
}> {}

/**
 * Thrown if the request is not valid text.
 *
 * @category Errors
 * @since 0.1.0
 */
export class MalformedTextError extends Data.TaggedError('MalformedTextError')<{
  message: string;
  cause: unknown;
}> {}

/**
 * Thrown if the request is not valid text.
 *
 * @category Errors
 * @since 0.1.0
 */
export class BodyIsNotPresentError extends Data.TaggedError('BodyIsNotPresentError')<{
  message: string;
}> {}
