import { pipe } from 'effect';

export function normalizeApiReferenceLink(link: string): string {
  return pipe(
    link,
    (_) => {
      const ext = '.md';
      if (!_.endsWith(ext)) {
        return _;
      }

      return _.slice(0, -ext.length);
    },
    (_) => {
      const suffix = 'index';
      if (!_.endsWith(suffix)) {
        return _;
      }

      return _.slice(0, -suffix.length);
    },
    (_) => {
      const prevPrefix = 'fx-fetch/namespaces/';
      const nextPrefix = 'namespaces/';

      if (!_.startsWith(prevPrefix)) {
        return _;
      }

      return nextPrefix + _.slice(prevPrefix.length);
    }
  );
}
