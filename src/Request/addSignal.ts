import { dual } from 'effect/Function';
import { requestToRequestIntermediate } from './inputToRequestIntermediate';
import { makeFromRequestIntermediate } from './makeFromRequestIntermediate';
import * as Request from './Request';

function addSignalFn(self: Request.Request, signal: AbortSignal): Request.Request {
  const intermediate = requestToRequestIntermediate(self);
  intermediate.clonedSignals.push(signal);

  return makeFromRequestIntermediate(intermediate);
}

/**
 * Adds an abort signal to a Request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const controller = new AbortController();
 * const request = Request.make({ url: 'https://api.example.com' });
 * const requestWithSignal = Request.addSignal(request, controller.signal);
 * ```
 *
 * @category Combinators
 * @since 0.1.0
 */
export const addSignal: {
  /**
   * Adds an abort signal to a Request.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   *
   * const controller = new AbortController();
   * const request = Request.make({ url: 'https://api.example.com' });
   * const requestWithSignal = Request.addSignal(request, controller.signal);
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (self: Request.Request, signal: AbortSignal): Request.Request;
  /**
   * Adds an abort signal to a Request.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   * import { pipe } from 'effect';
   *
   * const controller = new AbortController();
   * const request = Request.make({ url: 'https://api.example.com' });
   *
   * const requestWithSignal = pipe(
   *   request,
   *   Request.addSignal(controller.signal)
   * );
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (signal: AbortSignal): (self: Request.Request) => Request.Request;
} = dual(2, addSignalFn);
