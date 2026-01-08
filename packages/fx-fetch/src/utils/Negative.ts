import { type Brand, error, refined } from 'effect/Brand';

export type Negative = number & Brand<'Negative'>;
export const Negative = refined<Negative>(
  (n) => n < 0,
  (n) => error(`Expected ${n} to be negative`)
);
