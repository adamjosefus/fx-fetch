import { dual } from 'effect/Function';
import { headersIntermediateDelete } from '../utils/headersIntermediateDelete';
import { responseToResponseIntermediate } from './inputToResponseIntermediate';
import { isResponse } from './isResponse';
import { makeFromResponseIntermediate } from './makeFromResponseIntermediate';
import type { Response } from './Response';

function deleteHeaderFn(self: Response, name: string, value?: string): Response {
  const intermediate = responseToResponseIntermediate(self);
  headersIntermediateDelete(intermediate.clonedHeaders, name, value);

  return makeFromResponseIntermediate(intermediate);
}

// TODO: Add tests

/**
 * Deletes a header from a Response.
 *
 * @example
 * ```ts
 * import { Response } from 'fx-fetch';
 *
 * const response = Response.make({ url: 'https://api.example.com' });
 * const responseWithoutHeader = Response.deleteHeader(response, 'Authorization');
 * ```
 *
 * @category Combinators
 * @since 0.1.0
 */
export const deleteHeader: {
  /**
   * Deletes a header from a Response.
   *
   * @example
   * ```ts
   * import { Response } from 'fx-fetch';
   *
   * const response = Response.make({ url: 'https://api.example.com' });
   * const responseWithoutHeader = Response.deleteHeader(response, 'Authorization');
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (self: Response, name: string, value?: string): Response;
  /**
   * Deletes a header from a Response.
   *
   * @example
   * ```ts
   * import { Response } from 'fx-fetch';
   * import { pipe } from 'effect';
   *
   * const response = Response.make({ url: 'https://api.example.com' });
   *
   * const responseWithoutHeader = pipe(
   *   response,
   *   Response.deleteHeader('Authorization')
   * );
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (name: string, value?: string): (self: Response) => Response;
} = dual((args) => isResponse(args[0]), deleteHeaderFn);
