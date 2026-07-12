import { TypeId, type Url } from './Url.js';

// TODO: Add tests for this function

/**
 * @category Guards
 * @since 2.0.0
 */
export function isUrl(input: unknown): input is Url {
  return typeof input === 'object' && input !== null && TypeId in input;
}
