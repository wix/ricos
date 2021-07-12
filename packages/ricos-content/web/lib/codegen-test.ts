import codegen from 'codegen.macro';

export const test = codegen`module.exports = Date.now().toString()`;
