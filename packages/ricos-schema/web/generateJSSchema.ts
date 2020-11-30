import { readdirSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';

const GEN_DIR = 'build';
const TS_PROTO_DIR = '../../../node_modules/.bin/protoc-gen-ts_proto';

const schemas = readdirSync('.');

execSync(`rm -rf ${GEN_DIR}`);
mkdirSync(GEN_DIR);

schemas.forEach(schema => {
  if (schema.endsWith('.proto')) {
    execSync(
      // eslint-disable-next-line max-len
      `protoc --plugin=${TS_PROTO_DIR} --ts_proto_opt=useOptionals=true --ts_proto_opt=stringEnums=true --ts_proto_out=${GEN_DIR} ${schema}`
    );
  }
});
