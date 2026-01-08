import { pipeArguments } from 'effect/Pipeable';
import { TypeId } from './Request';

export const Proto = {
  [TypeId]: TypeId,
  pipe() {
    // biome-ignore lint/complexity/noArguments: We want to allow any number of arguments. Stolen from Effect it self.
    return pipeArguments(this, arguments);
  },
};
