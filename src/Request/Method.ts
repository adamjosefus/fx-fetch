const methods = [
  'CONNECT',
  'DELETE',
  'GET',
  'HEAD',
  'OPTIONS',
  'PATCH',
  'POST',
  'PUT',
  'TRACE',
] as const;

/**
 * @internal
 */
export type Method = (typeof methods)[number];

/**
 * @internal Checks if a value is a valid HTTP method.
 */
export function isMethod(method: unknown): method is Method {
  if (typeof method !== 'string') {
    return false;
  }

  return (methods as readonly string[]).includes(method);
}
