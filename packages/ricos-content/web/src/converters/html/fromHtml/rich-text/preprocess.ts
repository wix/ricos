import { flow } from 'fp-ts/function';

const replace = (replaced: RegExp | string, by: string) => (str: string): string =>
  str.replace(replaced, by);

export const preprocess = flow(
  replace(/\s*\n\s*/g, ''), // remove spaces between lines (they count as elements)
  replace('"<', '<'), // remove first `"` if exists
  replace('>"', '>'), // remove last `"` if exists
  replace(/""/g, '"'), // convert `""string""` to `"string"`
  replace(/<\s*br\s*\/?>/g, '\n') // replace br tags with new lines
);
