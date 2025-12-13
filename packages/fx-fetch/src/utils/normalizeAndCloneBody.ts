/**
 * @internal Internal isolated implementation of normalizing the Request body as a Blob.
 */
export function normalizeAndCloneBody(
  value: undefined | null | Promise<Blob> | globalThis.BodyInit
): Promise<Blob> | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (value instanceof Promise) {
    const _check: Promise<Blob> = value; // In theory, we could make different types of promises in the future.
    return value;
  }

  if (value instanceof Blob) {
    return Promise.resolve(value); // Blobs are immutable, so we can return them directly.
  }

  const reader = new globalThis.Response(value);
  return reader.blob();
}
