import { mkdirSync, readdirSync, writeFileSync, readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { LATEST_VERSION } from './consts';

const GEN_DIR = 'src/generated';
const TS_PROTO_DIR = '../../../node_modules/.bin/protoc-gen-ts_proto';
const PACKAGE_PATH = `wix/rich_content/v${LATEST_VERSION}`;

const mkdirSyncDeep = (...[path, options]: Parameters<typeof mkdirSync>): void => {
  path
    .toString()
    .split('/')
    .reduce((deepDir, dir) => {
      const newDir = deepDir ? deepDir + '/' + dir : dir;
      if (!existsSync(newDir)) {
        mkdirSync(newDir, options);
      }
      return newDir;
    }, '');
};

mkdirSyncDeep(`${GEN_DIR}/proto/${PACKAGE_PATH}`);

const schemas = readdirSync(`./src/main/proto/${PACKAGE_PATH}`);

schemas.forEach(schema => {
  const schemaFile = readFileSync(`src/main/proto/${PACKAGE_PATH}/${schema}`, 'utf8');
  writeFileSync(
    `${GEN_DIR}/proto/${PACKAGE_PATH}/${schema}`,
    schemaFile.replace(/ \[.*\];/g, ';').replace('import "wix/api/validations.proto";\n', '')
  );
});

// TEMPORARY DUPLICATION
mkdirSyncDeep(`src/main/proto/rich_content/v${LATEST_VERSION}`);
schemas.forEach(schema => {
  const schemaFile = readFileSync(`src/main/proto/${PACKAGE_PATH}/${schema}`, 'utf8');
  writeFileSync(
    `src/main/proto/rich_content/v${LATEST_VERSION}/${schema}`,
    schemaFile.replace('package wix.rich_content', 'package rich_content')
  );
});

schemas.forEach(schema =>
  execSync(
    // eslint-disable-next-line max-len
    `protoc --plugin=${TS_PROTO_DIR} --proto_path ${GEN_DIR}/proto --ts_proto_opt=useOptionals=true,outputEncodeMethods=false,constEnums=true,stringEnums=true,exportCommonSymbols=false,outputPartialMethods=false --ts_proto_out=${GEN_DIR} ${GEN_DIR}/proto/${PACKAGE_PATH}/${schema}`
  )
);

const indexFile = schemas.reduce(
  (fileString, schema) => fileString + `export * from './${schema.replace('.proto', '')}';\n`,
  `export const LATEST_VERSION = ${LATEST_VERSION};\n`
);

writeFileSync(`${GEN_DIR}/${PACKAGE_PATH}/index.ts`, indexFile);
