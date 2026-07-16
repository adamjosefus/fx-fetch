import { Inspectable, Pipeable } from 'effect';
import { format } from './format.js';
import { TypeId, type Url, type Proto as UrlProto } from './Url.js';

export const Proto: UrlProto = {
  [TypeId]: TypeId,
  [Inspectable.NodeInspectSymbol]: Inspectable.BaseProto[Inspectable.NodeInspectSymbol],
  toString: Inspectable.BaseProto.toString,
  toJSON(this: Url) {
    return {
      _id: 'Url',
      url: format(this),
    };
  },
  pipe() {
    // biome-ignore lint/complexity/noArguments: Forward every argument to the pipe implementation, same as Effect does.
    return Pipeable.pipeArguments(this, arguments);
  },
};
