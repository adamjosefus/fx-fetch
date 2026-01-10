import { BodyIsNotPresentError } from '../Cause';
import type * as localThis from './localThis';
import { resolveBlobOrThrow } from './resolveBlobOrThrow';

/**
 * Reads the body as ArrayBuffer, throwing detailed errors if it fails.
 * @internal
 */
export async function readBodyAsArrayBufferOrThrow(
  body: Promise<localThis.Blob> | undefined
): Promise<ArrayBuffer> {
  if (body === undefined) {
    throw new BodyIsNotPresentError({ message: 'Body is not present' });
  }

  const blob: localThis.Blob = await resolveBlobOrThrow(body);
  return await blob.arrayBuffer();
}
