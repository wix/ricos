import { mkdirSync } from 'fs';
import { execSync } from 'child_process';

const DIST_DIR = 'dist';
const OUT_FILE = `${DIST_DIR}/ricos-content`;

mkdirSync(DIST_DIR);

// Generate schema
execSync(
  // eslint-disable-next-line max-len
  `pbjs -t static-module -o ${OUT_FILE}.cjs.js -w commonjs --force-number --no-instance ricos_schema.proto &&
   pbjs -t static-module -o ${OUT_FILE}.js -w es6 --force-number --no-instance ricos_schema.proto &&
   pbts -o ${OUT_FILE}.d.ts ${OUT_FILE}.js`
);
