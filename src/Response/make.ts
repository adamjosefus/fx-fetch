import { Option } from 'effect';
import { unsafeMake } from './unsafeMake';

// TODO: Add examples

/**
 * Creates a Response from the given input, returning None if the input is invalid.
 *
 * @category Constructors
 * @since 0.1.0
 */
export const make = Option.liftThrowable(unsafeMake);
