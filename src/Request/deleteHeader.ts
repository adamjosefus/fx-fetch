import { dual } from 'effect/Function';
import { headersIntermediateDelete } from '../utils/headersIntermediateDelete';
import { requestToRequestIntermediate } from './inputToRequestIntermediate';
import { makeFromRequestIntermediate } from './makeFromRequestIntermediate';
import * as Request from './Request';

function deleteHeaderFn(self: Request.Request, name: string, value?: string): Request.Request {
  const intermediate = requestToRequestIntermediate(self);
  headersIntermediateDelete(intermediate.clonedHeaders, name, value);

  return makeFromRequestIntermediate(intermediate);
}

// TODO: Add tests

/**
 * Deletes a header from a Request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com' });
 * const requestWithoutHeader = Request.deleteHeader(request, 'Authorization');
 * ```
 *
 * @category Combinators
 * @since 0.1.0
 */
export const deleteHeader: {
  /**
   * Deletes a header from a Request.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   * const requestWithoutHeader = Request.deleteHeader(request, 'Authorization');
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (self: Request.Request, name: string, value?: string): Request.Request;
  /**
   * Deletes a header from a Request.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   * import { pipe } from 'effect';
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   *
   * const requestWithoutHeader = pipe(
   *   request,
   *   Request.deleteHeader('Authorization')
   * );
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (name: string, value?: string): (self: Request.Request) => Request.Request;
} = dual(2, deleteHeaderFn);
