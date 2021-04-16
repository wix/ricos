import { promisify } from 'util';
import { readFile, writeFile } from 'fs';
import globby from 'globby';
import * as E from 'fp-ts/lib/Either';
import * as TE from 'fp-ts/lib/TaskEither';

const readFromFile = promisify(readFile);
const writeToFile = promisify(writeFile);

export const getTypingFileList = (glob: string) =>
  TE.tryCatch(() => <Promise<string[]>>globby(glob), E.toError);

export const getFileContents = (path: string) =>
  TE.tryCatch(() => readFromFile(path, 'utf-8'), E.toError);

export const writeContentToFile = (path: string) => (contents: string) =>
  TE.tryCatch(() => writeToFile(path, contents), E.toError);
