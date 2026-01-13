import type * as localThis from './localThis';

/**
 * @internal
 */
export type BodyInput = Promise<localThis.Blob> | localThis.BodyInit | null | undefined;
