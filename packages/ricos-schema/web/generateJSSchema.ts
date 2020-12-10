import { mkdirSync, copyFileSync } from 'fs';
import { execSync } from 'child_process';

const GEN_DIR = 'generated';
const DIST_DIR = 'dist';
const TS_PROTO_DIR = '../../../node_modules/.bin/protoc-gen-ts_proto';
const OUT_FILE = `${GEN_DIR}/ricos-content`;

mkdirSync(GEN_DIR);
mkdirSync(DIST_DIR);
mkdirSync(`${DIST_DIR}/${GEN_DIR}`);

// Generate types
execSync(
  // eslint-disable-next-line max-len
  `protoc --plugin=${TS_PROTO_DIR} --ts_proto_opt=useOptionals=true,stringEnums=true,outputEncodeMethods=false,outputJsonMethods=false,outputClientImpl=false --ts_proto_out=${GEN_DIR} *.proto`
);

// Generate schema toolset
execSync(
  `pbjs -t static-module -o ${OUT_FILE}.js ricos_schema.proto &&
   pbts -o ${OUT_FILE}.d.ts ${OUT_FILE}.js`
);

// Copy schema toolset to dist
copyFileSync(`${OUT_FILE}.js`, `${DIST_DIR}/${OUT_FILE}.js`);
copyFileSync(`${OUT_FILE}.d.ts`, `${DIST_DIR}/${OUT_FILE}.d.ts`);
