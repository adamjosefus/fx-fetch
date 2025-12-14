import { BodyIsNotPresentError } from '../Cause';
import { resolveBlobOrThrow } from './resolveBlobOrThrow';

/**
 * Reads the body as text, throwing detailed errors if it fails.
 * @internal
 */
export async function readBodyAsTextOrThrow(body: Promise<Blob> | undefined): Promise<string> {
  if (body === undefined) {
    throw new BodyIsNotPresentError({ message: 'Body is not present' });
  }

  const blob: Blob = await resolveBlobOrThrow(body);
  return await blob.text();
}
