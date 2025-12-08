import { Lowercase } from './Lowercase';

/**
 * @internal Type representing HTTP headers as a read-only map with lowercase keys and readonly string array values.
 */
export type Headers = ReadonlyMap<Lowercase, readonly string[]>;
