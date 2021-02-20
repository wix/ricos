const replace = require('replace-in-file');

const results = replace.sync({
  files: 'dist/styles.min.css',
  from: /-noop:1;?/g,
  to: '',
});
