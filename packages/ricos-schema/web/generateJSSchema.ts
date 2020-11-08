import { readdirSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';

const GEN_DIR = 'generated';

const schemas = readdirSync('.');

execSync(`rm -rf ${GEN_DIR}`);
mkdirSync(GEN_DIR);

schemas.forEach(schema => {
  const schemaOutput = (newExtension: string) => schema.replace('.proto', `.${newExtension}`);

  if (schema.endsWith('.proto')) {
    // js output
    execSync(`pbjs -t static-module -o ${GEN_DIR}/${schemaOutput('js')} -w commonjs ${schema}`);
    // json output
    execSync(`pbjs -t json -o ${GEN_DIR}/${schemaOutput('json')} -w commonjs ${schema}`);
    // json-module output
    execSync(`pbjs -t json-module -o ${GEN_DIR}/${schemaOutput('json.js')} -w commonjs ${schema}`);
    // type definitions
    execSync(`pbts -o ${GEN_DIR}/${schemaOutput('d.ts')} ${GEN_DIR}/${schemaOutput('js')}`);
  }
});
