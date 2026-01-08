import { statusToOk } from '../utils/statusToOk';
import type { Response } from './Response';

// TODO: Add description

/**
 * @category Predicates
 */
export function isOk(response: Response): boolean {
  return statusToOk(response.status);
}
