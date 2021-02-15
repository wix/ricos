import { mkdirSync, readdirSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

const GEN_DIR = 'generated';
const TS_PROTO_DIR = '../../../node_modules/.bin/protoc-gen-ts_proto';

execSync(`rm -rf ${GEN_DIR}`);
mkdirSync(GEN_DIR);

const schemas = readdirSync('./schemas');

schemas.forEach(schema => {
  if (schema.endsWith('.proto')) {
    execSync(
      // eslint-disable-next-line max-len
      `protoc --plugin=${TS_PROTO_DIR} --proto_path schemas --ts_proto_opt=useOptionals=true,outputEncodeMethods=false,stringEnums=true,useDate=false,exportCommonSymbols=false --ts_proto_out=${GEN_DIR} schemas/${schema}`
    );
  }
});

const indexFile = schemas.reduce(
  (fileString, schema) => fileString + `export * from './${schema.replace('.proto', '')}';\n`,
  ''
);

writeFileSync(`${GEN_DIR}/index.ts`, indexFile);
