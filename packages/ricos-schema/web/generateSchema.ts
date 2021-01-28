import { mkdirSync } from 'fs';
import { execSync } from 'child_process';

const DIST_DIR = 'dist';
const OUT_FILE = `${DIST_DIR}/rich-content`;

mkdirSync(DIST_DIR);

// Generate schema
execSync(
  // eslint-disable-next-line max-len
  `pbjs -t static-module -o ${OUT_FILE}.js --force-number --no-instance schemas/rich-content.proto &&
   pbts -o ${OUT_FILE}.d.ts ${OUT_FILE}.js`
);
