import type * as localThis from '../utils/localThis';
import { isRequest } from './isRequest';
import type { Request } from './Request';

function isJsRequest(input: unknown): input is localThis.Request {
  return input instanceof globalThis.Request;
}

function isRequestOptions(input: Request.Options | Request.Parts): input is Request.Options {
  const hasSearchParams = 'searchParams' in input;

  if (hasSearchParams) {
    return true;
  }

  return false;
}

/**
 * @internal Determines the type of Request.Request.Input
 */
export function classifyRequestInput(input: Request.Input):
  | {
      readonly type: 'request';
      readonly input: Request;
    }
  | {
      readonly type: 'jsRequest';
      readonly input: localThis.Request;
    }
  | {
      readonly type: 'options';
      readonly input: Request.Options;
    }
  | {
      readonly type: 'parts';
      readonly input: Request.Parts;
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
