import { Headers } from './Headers';
import { toLowercase } from './toLowercase';

/**
 * @internal Gets the values of a header from a `Headers` map.
 */
export function headersGetSingle(self: Headers, name: string) {
  const normalizedName = toLowercase(name);

  const values = self.get(normalizedName) ?? undefined;
  return values;
}
