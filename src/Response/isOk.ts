import { statusToOk } from '../utils/statusToOk';
import * as Response from './Response';

// TODO: Add description

/**
 * @category Predicates
 */
export function isOk(response: Response.Response): boolean {
  return statusToOk(response.status);
}
