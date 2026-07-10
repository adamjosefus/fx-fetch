import type { SearchParams } from './SearchParams.js';

/**
 * @category Conversions
 * @since 2.0.0
 */
export function format(searchParams: SearchParams): string {
  const builder: readonly string[] = [];

  return builder.join('&');
}
