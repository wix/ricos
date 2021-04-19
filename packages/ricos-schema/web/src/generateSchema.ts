import { mkdirSync, readdirSync, writeFileSync, readFileSync } from 'fs';
import { execSync } from 'child_process';
import { LATEST_VERSION } from './consts';

const GEN_DIR = 'src/generated';
const TS_PROTO_DIR = '../../../node_modules/.bin/protoc-gen-ts_proto';

mkdirSync(GEN_DIR);
mkdirSync(`${GEN_DIR}/proto`);
mkdirSync(`${GEN_DIR}/proto/rich_content`);
mkdirSync(`${GEN_DIR}/proto/rich_content/v${LATEST_VERSION}`);

const schemas = readdirSync(`./src/main/proto/rich_content/v${LATEST_VERSION}`);

schemas.forEach(schema => {
  const schemaFile = readFileSync(
    `src/main/proto/rich_content/v${LATEST_VERSION}/${schema}`,
    'utf8'
  );
  writeFileSync(
    `${GEN_DIR}/proto/rich_content/v${LATEST_VERSION}/${schema}`,
    schemaFile.replace(/ \[.*\];/g, ';')
  );
});

schemas.forEach(schema =>
  execSync(
    // eslint-disable-next-line max-len
    `protoc --plugin=${TS_PROTO_DIR} --proto_path ${GEN_DIR}/proto --ts_proto_opt=useOptionals=true,outputEncodeMethods=false,constEnums=true,stringEnums=true,exportCommonSymbols=false,outputPartialMethods=false --ts_proto_out=${GEN_DIR} ${GEN_DIR}/proto/rich_content/v${LATEST_VERSION}/${schema}`
  )
);

const indexFile = schemas.reduce(
  (fileString, schema) => fileString + `export * from './${schema.replace('.proto', '')}';\n`,
  `export const LATEST_VERSION = ${LATEST_VERSION};\n`
);

writeFileSync(`${GEN_DIR}/rich_content/v${LATEST_VERSION}/index.ts`, indexFile);
