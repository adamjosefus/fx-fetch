import { Lowercase } from './Lowercase';

/**
 * @internal Mutable intermediate representation of Headers.
 */
export type HeadersIntermediate = Map<Lowercase, /* mutable */ string[]>;
