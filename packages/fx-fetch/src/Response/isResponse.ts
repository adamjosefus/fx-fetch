import * as Response from './Response';

/**
 * Checks if the given value is a Response.
 *
 * @category Guards
 * @since 0.1.0
 */
export function isResponse(value: unknown): value is Response.Response {
  const isObject = typeof value === 'object' && value !== null;

  if (!isObject) {
    return false;
  }

  // biome-ignore lint/suspicious/noExplicitAny: It's safe to use `any` for property detection.
  const hasTypeId = (value as any)[Response.TypeId] === Response.TypeId;
  // biome-ignore lint/suspicious/noExplicitAny: It's safe to use `any` for property detection.
  const hasTag = (value as any)._tag === 'Response';

  return hasTypeId && hasTag;
}
