import * as Request from './Request';

/**
 * Gets the abort signal of the request.
 *
 * If multiple signals are present, it combines them using `AbortSignal.any`.
 * If no signals are present, it returns `undefined`.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const controller = new AbortController();
 * const request = Request.make({ url: 'https://api.example.com', signal: controller.signal });
 * const signals = Request.getSignal(request);
 * console.log(signals); // [AbortSignal]
 * ```
 *
 * @category Getters
 * @since 0.1.0
 */
export const getSignal = (self: Request.Request): globalThis.AbortSignal | undefined =>
  self.signals.length > 0 ? AbortSignal.any([...self.signals]) : undefined;
