import { type Request, TypeId } from './Request';

/**
 * Checks if the given value is a Request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com' });
 * console.log(Request.isRequest(request)); // true
 * console.log(Request.isRequest({})); // false
 * ```
 *
 * @category Guards
 * @since 0.1.0
 */
export function isRequest(value: unknown): value is Request {
  const isObject = typeof value === 'object' && value !== null;

  if (!isObject) {
    return false;
  }

  // biome-ignore lint/suspicious/noExplicitAny: It's safe to use `any` for property detection.
  const hasTypeId = (value as any)[TypeId] === TypeId;
  // biome-ignore lint/suspicious/noExplicitAny: It's safe to use `any` for property detection.
  const hasTag = (value as any)._tag === 'Request';

  return hasTypeId && hasTag;
}
