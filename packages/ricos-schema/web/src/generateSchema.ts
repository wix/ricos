import { mkdirSync, readdirSync, writeFileSync, readFileSync } from 'fs';
import { execSync } from 'child_process';

const GEN_DIR = 'src/generated';
const TS_PROTO_DIR = '../../../node_modules/.bin/protoc-gen-ts_proto';

mkdirSync(GEN_DIR);
mkdirSync(`${GEN_DIR}/proto`);

const schemas = readdirSync('./src/main/proto');

schemas.forEach(schema => {
  const schemaFile = readFileSync(`src/main/proto/${schema}`, 'utf8');
  writeFileSync(`${GEN_DIR}/proto/${schema}`, schemaFile.replace(/ \[.*\];/g, ';'));
});

schemas.forEach(schema =>
  execSync(
    // eslint-disable-next-line max-len
    `protoc --plugin=${TS_PROTO_DIR} --proto_path ${GEN_DIR}/proto --ts_proto_opt=useOptionals=true,outputEncodeMethods=false,stringEnums=true,useDate=false,exportCommonSymbols=false,outputPartialMethods=false --ts_proto_out=${GEN_DIR} ${GEN_DIR}/proto/${schema}`
  )
);

const indexFile = schemas.reduce(
  (fileString, schema) => fileString + `export * from './${schema.replace('.proto', '')}';\n`,
  ''
);

writeFileSync(`${GEN_DIR}/index.ts`, indexFile);
