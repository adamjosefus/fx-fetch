import { flatMap } from 'effect/Effect';
import type { Request } from '../Request';
import { readArrayBuffer } from '../Response';
import { fetch } from './fetchFn';

/**
 * Fetches and reads an array buffer response.
 *
 * @category Functions
 * @since 0.1.0
 */
export const fetchArrayBuffer = (request: Request) => fetch(request).pipe(flatMap(readArrayBuffer));
