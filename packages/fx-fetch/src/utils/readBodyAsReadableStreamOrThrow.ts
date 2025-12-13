import { BodyIsNotPresentError } from '../Cause';
import { resolveBlobOrThrow } from './resolveBlobOrThrow';

/**
 * Reads the body as ReadableStream, throwing detailed errors if it fails.
 * @internal
 */
export async function readBodyAsReadableStreamOrThrow(
  body: Promise<Blob> | undefined
): Promise<ReadableStream<Uint8Array<ArrayBuffer>>> {
  if (body === undefined) {
    throw new BodyIsNotPresentError({ message: 'Body is not present' });
  }

  const blob: Blob = await resolveBlobOrThrow(body);
  return await blob.stream();
}
