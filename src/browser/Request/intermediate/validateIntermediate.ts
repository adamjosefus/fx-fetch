import { Cause, Result } from 'effect';
import { validateIntermediate as validateUrlIntermediate } from '../../Url/intermediate/validateIntermediate.js';
import type { $Request } from './$Request.js';

/**
 * @internal Validates an intermediate Request, returning the error as a value.
 *
 * The method is intentionally not validated — any custom HTTP method is allowed.
 * The only source of failure is the composed url.
 */
export function validateIntermediate(
  request: $Request
): Result.Result<$Request, Cause.IllegalArgumentError> {
  const urlResult = validateUrlIntermediate(request.url);
  if (Result.isFailure(urlResult)) {
    return Result.fail(urlResult.failure);
  }

  return Result.succeed(request);
}
