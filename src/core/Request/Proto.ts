import { Inspectable, Pipeable } from 'effect';
import { format as formatUrl } from '../Url/format.js';
import { type Request, type Proto as RequestProto, TypeId } from './Request.js';

export const Proto: RequestProto = {
  [TypeId]: TypeId,
  [Inspectable.NodeInspectSymbol]: Inspectable.BaseProto[Inspectable.NodeInspectSymbol],
  toString: Inspectable.BaseProto.toString,
  toJSON(this: Request) {
    return {
      _id: 'Request',
      method: this.method,
      url: formatUrl(this.url),
      headers: Object.fromEntries(this.headers),
    };
  },
  pipe() {
    // biome-ignore lint/complexity/noArguments: Forward every argument to the pipe implementation, same as Effect does.
    return Pipeable.pipeArguments(this, arguments);
  },
};
