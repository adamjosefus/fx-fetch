const knownMethods = [
  'CONNECT',
  'DELETE',
  'GET',
  'HEAD',
  'OPTIONS',
  'PATCH',
  'POST',
  'PUT',
  'QUERY',
  'TRACE',
] as const;

/**
 * A well-known HTTP method. Used as the literal side of {@link Method} so editors
 * can autocomplete the common methods.
 *
 * @category Models
 * @since 0.1.0
 */
export type KnownMethod = (typeof knownMethods)[number];

/**
 * An HTTP method. The union of {@link KnownMethod} keeps editor autocomplete for
 * the common methods, while the `string & Record<never, never>` branch keeps the
 * type open to any custom method (e.g. a non-standard verb). `Request` therefore
 * never rejects a method — it only normalizes it.
 *
 * @category Models
 * @since 0.1.0
 */
export type Method = KnownMethod | (string & Record<never, never>);

/**
 * @internal Checks if a value is one of the well-known HTTP methods.
 */
export function isMethod(method: unknown): method is KnownMethod {
  if (typeof method !== 'string') {
    return false;
  }

  return (knownMethods as readonly string[]).includes(method);
}
