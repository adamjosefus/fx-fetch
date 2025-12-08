import { BodyIsNotPresentError } from '../Cause';
import { resolveBlobOrThrow } from './resolveBlobOrThrow';

/**
 * Reads the body as JSON, throwing detailed errors if it fails.
 * @internal
 */
export async function readBodyAsJsonOrThrow(body: Promise<Blob> | undefined): Promise<unknown> {
  if (body === undefined) {
    throw new BodyIsNotPresentError({ message: 'Body is not present' });
  }

  const blob: Blob = await resolveBlobOrThrow(body);
  const text = await blob.text();

  return JSON.parse(text) as unknown;
}
