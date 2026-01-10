import { BodyIsNotPresentError } from '../Cause';
import type * as localThis from './localThis';
import { resolveBlobOrThrow } from './resolveBlobOrThrow';

/**
 * Reads the body as Blob, throwing detailed errors if it fails.
 * @internal
 */
export async function readBodyAsBlobOrThrow(
  body: Promise<localThis.Blob> | undefined
): Promise<localThis.Blob> {
  if (body === undefined) {
    throw new BodyIsNotPresentError({ message: 'Body is not present' });
  }

  const blob: localThis.Blob = await resolveBlobOrThrow(body);
  return await blob;
}
