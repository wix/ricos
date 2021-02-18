import { mkdirSync, readdirSync, writeFileSync, readFileSync } from 'fs';
import { execSync } from 'child_process';

const GEN_DIR = 'generated';
const DIST_DIR = 'dist';
const TS_PROTO_DIR = '../../../node_modules/.bin/protoc-gen-ts_proto';

execSync(`rm -rf ${GEN_DIR}`);
mkdirSync(GEN_DIR);
mkdirSync(DIST_DIR);
mkdirSync(`${DIST_DIR}/wix-proto`);
mkdirSync(`${DIST_DIR}/proto`);

const schemas = readdirSync('./schemas');

schemas.forEach(schema => {
  const schemaFile = readFileSync(`schemas/${schema}`, 'utf8');
  writeFileSync(`${DIST_DIR}/wix-proto/${schema}`, schemaFile);
  writeFileSync(`${DIST_DIR}/proto/${schema}`, schemaFile.replace(/ \[.*\];/g, ';'));
});

schemas.forEach(schema =>
  execSync(
    // eslint-disable-next-line max-len
    `protoc --plugin=${TS_PROTO_DIR} --proto_path dist/proto --ts_proto_opt=useOptionals=true,outputEncodeMethods=false,stringEnums=true,useDate=false,exportCommonSymbols=false --ts_proto_out=${GEN_DIR} ${DIST_DIR}/proto/${schema}`
  )
);

const indexFile = schemas.reduce(
  (fileString, schema) => fileString + `export * from './${schema.replace('.proto', '')}';\n`,
  ''
);

writeFileSync(`${GEN_DIR}/index.ts`, indexFile);
