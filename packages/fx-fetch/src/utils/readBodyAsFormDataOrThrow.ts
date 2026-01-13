import { BodyIsNotPresentError } from '../Cause';
import type * as localThis from './localThis';
import { resolveBlobOrThrow } from './resolveBlobOrThrow';

/**
 * Reads the body as FormData, throwing detailed errors if it fails.
 * @internal
 */
export async function readBodyAsFormDataOrThrow(
  body: Promise<localThis.Blob> | undefined
): Promise<localThis.FormData> {
  if (body === undefined) {
    throw new BodyIsNotPresentError({ message: 'Body is not present.' });
  }

  const blob = await resolveBlobOrThrow(body);
  const reader = new globalThis.Response(blob);
  return await reader.formData();
}
