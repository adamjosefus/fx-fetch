import type { ReadonlyRecord } from './ReadonlyRecord';

export function isObjectBlank(obj: ReadonlyRecord<PropertyKey, unknown>): boolean {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}
