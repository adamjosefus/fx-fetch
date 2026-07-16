import { Cause, Result } from 'effect';
import type { $Url } from './$Url.js';

const maxValidPort = 65535;

/**
 * @internal Validates an intermediate Url, returning the error as a value.
 */
export function validateIntermediate(url: $Url): Result.Result<$Url, Cause.IllegalArgumentError> {
  if (
    url.port !== undefined &&
    !(Number.isSafeInteger(url.port) && url.port >= 0 && url.port <= maxValidPort)
  ) {
    return Result.fail(
      new Cause.IllegalArgumentError(
        `Url cannot be created. Port must be an integer between 0 and ${maxValidPort}. Given: ${url.port}`
      )
    );
  }

  if (url.username === undefined && url.password !== undefined) {
    return Result.fail(
      new Cause.IllegalArgumentError('Url cannot be created. Password without username.')
    );
  }

  return Result.succeed(url);
}
