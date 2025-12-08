import { BodyIsNotPresentError } from '../Cause';
import { resolveBlobOrThrow } from './resolveBlobOrThrow';

/**
 * Reads the body as Blob, throwing detailed errors if it fails.
 * @internal
 */
export async function readBodyAsBlobOrThrow(body: Promise<Blob> | undefined): Promise<Blob> {
  if (body === undefined) {
    throw new BodyIsNotPresentError({ message: 'Body is not present' });
  }

  const blob: Blob = await resolveBlobOrThrow(body);
  return await blob;
}
