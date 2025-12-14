import { Brand } from 'effect';

export type Negative = number & Brand.Brand<'Negative'>;
export const Negative = Brand.refined<Negative>(
  (n) => n < 0,
  (n) => Brand.error(`Expected ${n} to be negative`)
);
