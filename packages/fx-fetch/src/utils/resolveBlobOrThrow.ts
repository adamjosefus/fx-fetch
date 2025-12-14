/**
 * Safely resolves a Promise<Blob> and throws detailed errors if it fails.
 *
 * @internal
 */
export async function resolveBlobOrThrow(blob: Promise<Blob>): Promise<Blob> {
  try {
    const resolvedBlob: Blob = await blob; // We need to ensure the promise resolves
    return resolvedBlob;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        'Body is not accessible. Possibly due to CORS restrictions or decompression issues.',
        { cause: error }
      );
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Reading body was aborted.', { cause: error });
    }

    if (error instanceof RangeError) {
      throw new Error('Body is too large. We could not allocate enough memory.', { cause: error });
    }

    throw new Error('An unknown error occurred while accessing the body.', { cause: error });
  }
}
