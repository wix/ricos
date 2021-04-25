import * as E from 'fp-ts/lib/Either';
import * as A from 'fp-ts/lib/Array';
import * as TE from 'fp-ts/lib/TaskEither';
import * as T from 'fp-ts/lib/Task';
import { join } from 'lodash/fp';
import { pipe } from 'fp-ts/lib/function';
import { generateRtoModules } from 'typeonly';

import {
  deleteFile,
  getTypingFileList,
  getFileContents,
  writeContentToFile,
} from './file-operations';
import { purifyTypes } from './type-operations';

const log = (label: string) => <T>(data: T): T => {
  console.log(label, data); // eslint-disable-line no-console
  return data;
};

async function run() {
  const RICOS_TYPES_DIR_GLOB = `${__dirname}/../../../../ricos-schema/web/dist/types/rich_content/v1/*.d.ts`;
  const SAFE_TYPES_PATH = `${__dirname}/../../statics/v1.d.ts`;

  const generateRto = () =>
    TE.tryCatch(
      () =>
        generateRtoModules({
          modulePaths: ['./v1'],
          readFiles: {
            sourceDir: `${__dirname}/../../statics`,
          },
          writeFiles: {
            outputDir: `${__dirname}/../../statics`,
            prettify: 2,
          },
          returnRtoModules: true,
        }),
      E.toError
    );

  const logger = log('TYPE DESCRIPTOR GENERATION:');

  const generateTypeDescriptors = pipe(
    getTypingFileList(RICOS_TYPES_DIR_GLOB),
    TE.map(log('TYPE DESCRIPTOR GENERATION: files to process:')),
    TE.chain(paths => A.array.traverse(TE.taskEither)(paths, getFileContents)),
    TE.map(A.map(purifyTypes)),
    TE.map(types => join('\n', types)),
    TE.chain(writeContentToFile(SAFE_TYPES_PATH)),
    TE.map(() => logger(`safe types.d.ts written`)),
    TE.chain(generateRto),
    TE.map(modules => logger(`[${Object.keys(modules || {})}] descriptors generated`)),
    TE.chain(() => deleteFile(SAFE_TYPES_PATH)),
    TE.map(() => logger(`safe types.d.ts deleted`)),
    TE.fold(
      e => T.of(e.message),
      () => T.of(`done`)
    )
  );

  logger(await generateTypeDescriptors());
}

run();
