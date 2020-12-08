import { readdirSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';

const GEN_DIR = 'build';
const DIST_DIR = 'dist';
const TS_PROTO_DIR = '../../../node_modules/.bin/protoc-gen-ts_proto';

const schemas = readdirSync('.');

execSync(`rm -rf ${GEN_DIR}`);
execSync(`rm -rf ${DIST_DIR}`);
mkdirSync(GEN_DIR);
mkdirSync(DIST_DIR);
mkdirSync(`${DIST_DIR}/validation`);

schemas.forEach(schema => {
  if (schema.endsWith('.proto')) {
    execSync(
      // eslint-disable-next-line max-len
      `protoc --plugin=${TS_PROTO_DIR} --ts_proto_opt=useOptionals=true --ts_proto_opt=stringEnums=true --ts_proto_out=${GEN_DIR} ${schema}`
    );
  }
});

execSync(
  // eslint-disable-next-line max-len
  `pbjs -t static-module -o ${DIST_DIR}/validation/validator.js --no-create --no-encode --no-decode --no-convert --no-delimited ricos_schema.proto`
);
execSync(`pbts -o ${DIST_DIR}/validation/validator.d.ts ${DIST_DIR}/validation/validator.js`);
