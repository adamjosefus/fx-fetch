import { type Request, TypeId } from './Request.js';

/**
 * @category Guards
 * @since 0.1.0
 */
export function isRequest(input: unknown): input is Request {
  return typeof input === 'object' && input !== null && TypeId in input;
}
