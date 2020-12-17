import { mkdirSync, copyFileSync } from 'fs';
import { execSync } from 'child_process';

const GEN_DIR = 'generated';
const DIST_DIR = 'dist';
const OUT_FILE = `${GEN_DIR}/ricos-content`;

mkdirSync(GEN_DIR);
mkdirSync(DIST_DIR);
mkdirSync(`${DIST_DIR}/${GEN_DIR}`);

// Generate schema
execSync(
  `pbjs -t static-module -o ${OUT_FILE}.cjs.js -w commonjs --force-number --no-instance ricos_schema.proto &&
   pbjs -t static-module -o ${OUT_FILE}.js -w es6 --force-number --no-instance ricos_schema.proto &&
   pbts -o ${OUT_FILE}.cjs.d.ts ${OUT_FILE}.cjs.js &&
   pbts -o ${OUT_FILE}.d.ts ${OUT_FILE}.js`
);

// Copy schema to dist
copyFileSync(`${OUT_FILE}.cjs.js`, `${DIST_DIR}/${OUT_FILE}.cjs.js`);
copyFileSync(`${OUT_FILE}.js`, `${DIST_DIR}/${OUT_FILE}.js`);
copyFileSync(`${OUT_FILE}.cjs.d.ts`, `${DIST_DIR}/${OUT_FILE}.cjs.d.ts`);
copyFileSync(`${OUT_FILE}.d.ts`, `${DIST_DIR}/${OUT_FILE}.d.ts`);
