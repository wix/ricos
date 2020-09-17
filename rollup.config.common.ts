/* eslint-disable */

import fs from 'fs';
import { cloneDeep } from 'lodash';
import { plugins as createPlugins } from './rollup.plugins';
import { isExternal as external } from './rollup.externals';
import { RollupOptions, OutputOptions, WatcherOptions } from 'rollup';

if (!process.env.MODULE_NAME) {
  console.error('Environment variable "MODULE_NAME" is missing!');
  process.exit(1);
}

export default (output: OutputOptions[], shouldExtractCss: boolean): RollupOptions[] => {
  const plugins = createPlugins(shouldExtractCss);
  output = output.map(o => ({ ...o, sourcemap: true }));
  if (process.env.MODULE_WATCH && !process.env.BUILD_CJS) {
    output = output.filter(o => o.format === 'es');
  }
  const watch: WatcherOptions = {
    exclude: ['node_modules/**'],
    clearScreen: false,
  };

  let addPartToFilename = (fileName: string, fileNamePart: string) => {
    const anchor = fileName.indexOf('.');
    fileName = `${fileName.slice(0, anchor)}.${fileNamePart}${fileName.slice(anchor)}`;
    return fileName;
  };

  const editorEntry: RollupOptions = {
    input: 'src/index.ts',
    output: cloneDeep(output),
    plugins,
    external,
    watch,
  };

  const libEntries: RollupOptions[] = [];
  try {
    let libEntriesPath = 'lib/';

    fs.readdirSync(`./${libEntriesPath}`).forEach(file => {
      libEntries.push({
        input: libEntriesPath + file,
        output: output.map(({ format }) => ({
          format,
          file: `dist/lib/${
            format === 'cjs'
              ? file.replace('.js', '.cjs.js').replace('.ts', '.cjs.js')
              : file.replace('.ts', '.js')
          }`,
        })),
        plugins,
        external,
        watch,
      });
    });
  } catch (_) {}

  let viewerEntry: RollupOptions;
  try {
    let viewerPath = 'src/viewer.ts';
    fs.accessSync(`./${viewerPath}`);
    viewerEntry = {
      input: viewerPath,
      output: cloneDeep(output).map(o => {
        const anchor = o.file.indexOf('.');
        o.file = addPartToFilename(o.file, 'viewer');
        return o;
      }),
      plugins,
      external,
      watch,
    };
  } catch (_) {}

  if (process.env.MODULE_ANALYZE_EDITOR) {
    return [editorEntry, ...libEntries].filter(x => x);
  } else if (process.env.MODULE_ANALYZE_VIEWER) {
    return [viewerEntry, ...libEntries].filter(x => x);
  } else {
    return [editorEntry, viewerEntry, ...libEntries].filter(x => x);
  }
};
