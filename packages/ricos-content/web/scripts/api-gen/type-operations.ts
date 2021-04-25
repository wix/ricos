import * as A from 'fp-ts/lib/Array';
import * as O from 'fp-ts/lib/Option';
import { flow, pipe } from 'fp-ts/lib/function';
import { compact, split, replace, join } from 'lodash/fp';

const toLines = split('\n');
const mergeLines = join('\n');
const toUnion = join(' | ');
const toLiteral = replace(/\s*\w* = ("\w+"),?/g, '$1');
const remove = (removed: string | RegExp) => replace(removed, '');
const linesWith = (filtered: string) => (line: string) => !line.includes(filtered);

const filterUnsupportedKeywords = (content: string) =>
  pipe(
    content,
    toLines,
    A.filter(linesWith('function ')),
    A.filter(linesWith('sourceMappingURL=')),
    A.filter(linesWith(' *')),
    A.filter(linesWith('/**')),
    A.filter(linesWith('*/')),
    A.filter(linesWith('import ')),
    mergeLines,
    remove(/declare /gm),
    remove(/export /gm)
  );

const getEnumData = (
  getMatches: () => RegExpExecArray | null,
  enumData: { name: string; union: string }[] = []
): { name: string; union: string }[] =>
  pipe(
    O.fromNullable(getMatches()),
    O.map(([, name, values]) => ({
      name,
      union: pipe(values, toLines, A.map(toLiteral), compact, toUnion),
    })),
    O.fold(
      () => enumData,
      ({ name, union }) => getEnumData(getMatches, [...enumData, { name, union }])
    )
  );

const enumToUnion = (content: string) => {
  const ENUM_REGEX = /const enum (.+) \{((?:\n\s*\w+ = "\w+",?)+)\n\}/gm;
  const getMatches = ENUM_REGEX.exec.bind(ENUM_REGEX, content);
  return getEnumData(getMatches).reduce(
    (content, { name, union }) => content.replace(name, union),
    content.replace(ENUM_REGEX, '')
  );
};

const removeConvertors = remove(
  /const \w+: \{\n\s*fromJSON\(.*\): \w+;\n\s*toJSON\(.*\): unknown;\n\s*\};/gm
);

const fixEmptyTypes = replace(/\{\n\}/gm, '{\n\tdummy?: boolean;\n}');

export const purifyTypes = flow(
  filterUnsupportedKeywords,
  enumToUnion,
  removeConvertors,
  fixEmptyTypes,
  toLines,
  A.filter(linesWith('const ')),
  compact,
  mergeLines
);
