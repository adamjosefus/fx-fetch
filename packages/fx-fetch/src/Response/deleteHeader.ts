import { dual } from 'effect/Function';
import { headersIntermediateDelete } from '../utils/headersIntermediateDelete';
import { responseToResponseIntermediate } from './inputToResponseIntermediate';
import { makeFromResponseIntermediate } from './makeFromResponseIntermediate';
import * as Response from './Response';

function deleteHeaderFn(self: Response.Response, name: string, value?: string): Response.Response {
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
  (self: Response.Response, name: string, value?: string): Response.Response;
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
  (name: string, value?: string): (self: Response.Response) => Response.Response;
} = dual(2, deleteHeaderFn);
