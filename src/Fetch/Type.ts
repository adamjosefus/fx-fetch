import { Context } from 'effect';
import { Fetch } from './Fetch';

/**
 * Type alias for the Fetch service type.
 *
 * @since 0.1.0
 * @category Models
 */
export type Type = Context.Tag.Service<Fetch>;
