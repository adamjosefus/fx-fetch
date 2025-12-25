import { isRequest } from './isRequest';
import * as Request from './Request';

function isJsRequest(input: unknown): input is globalThis.Request {
  return input instanceof globalThis.Request;
}

function isRequestOptions(
  input: Request.Request.Options | Request.Request.Parts
): input is Request.Request.Options {
  const hasSearchParams = 'searchParams' in input;

  if (hasSearchParams) {
    return true;
  }

  return false;
}

/**
 * @internal Determines the type of Request.Request.Input
 */
export function classifyRequestInput(input: Request.Request.Input):
  | {
      readonly type: 'request';
      readonly input: Request.Request;
    }
  | {
      readonly type: 'jsRequest';
      readonly input: globalThis.Request;
    }
  | {
      readonly type: 'options';
      readonly input: Request.Request.Options;
    }
  | {
      readonly type: 'parts';
      readonly input: Request.Request.Parts;
    } {
  if (isRequest(input)) {
    return {
      type: 'request',
      input,
    };
  }

  if (isJsRequest(input)) {
    return {
      type: 'jsRequest',
      input,
    };
  }

  if (isRequestOptions(input)) {
    return {
      type: 'options',
      input,
    };
  }

  return {
    type: 'parts',
    input: input,
  };
}
