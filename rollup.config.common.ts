/* eslint-disable */

import { readdirSync, accessSync } from 'fs';
import { cloneDeep } from 'lodash';
import { plugins as createPlugins, lastEntryPlugins } from './rollup.plugins';
import { isExternal as external } from './rollup.externals';
import { RollupOptions, OutputOptions, WatcherOptions } from 'rollup';

if (!process.env.MODULE_NAME) {
  console.error('Environment variable "MODULE_NAME" is missing!');
  process.exit(1);
}

const commonConfig = (output: OutputOptions[], shouldExtractCss: boolean): RollupOptions[] => {
  const plugins = createPlugins(shouldExtractCss);
  const watch: WatcherOptions = {
    exclude: ['node_modules/**'],
    clearScreen: false,
  };
  const commonOptions = {
    plugins,
    external,
    watch,
  };

  output = output.map(o => ({ ...o, sourcemap: true }));
  if (process.env.MODULE_WATCH && !process.env.BUILD_CJS) {
    output = output.filter(o => o.format === 'es');
  }

  let addPartToFilename = (fileName: string, fileNamePart: string) => {
    const anchor = fileName.indexOf('.');
    fileName = `${fileName.slice(0, anchor)}.${fileNamePart}${fileName.slice(anchor)}`;
    return fileName;
  };

  const editorEntry: RollupOptions = {
    input: 'src/index.ts',
    output: cloneDeep(output),
    ...commonOptions,
  };

  const libEntries: RollupOptions[] = [];
  try {
    let libEntriesPath = 'lib/';

    readdirSync(`./${libEntriesPath}`).forEach(file => {
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
        ...commonOptions,
      });
    });
  } catch (_) {}

  let viewerEntry: RollupOptions[] = [];
  try {
    let viewerPath = 'src/viewer.ts';
    accessSync(`./${viewerPath}`);
    viewerEntry.push({
      input: viewerPath,
      output: cloneDeep(output).map(o => {
        if (o.file) {
          const anchor = o.file.indexOf('.');
          o.file = addPartToFilename(o.file, 'viewer');
        }
        return o;
      }),
      ...commonOptions,
    });
  } catch (_) {}

  let entries;
  if (process.env.MODULE_ANALYZE_EDITOR) {
    entries = [editorEntry, ...libEntries];
  } else if (process.env.MODULE_ANALYZE_VIEWER) {
    entries = [...viewerEntry, ...libEntries];
  } else {
    entries = [editorEntry, ...viewerEntry, ...libEntries];
  }
  const lastEntry = entries[entries.length - 1];
  lastEntry.plugins = [...lastEntry.plugins, ...lastEntryPlugins];
  return entries.filter(x => x);
};

const output: OutputOptions[] = process.env.DYNAMIC_IMPORT
  ? [
      {
        dir: 'dist/es',
        format: 'es',
      },
      {
        dir: 'dist/cjs/',
        format: 'cjs',
      },
    ]
  : [
      {
        file: 'dist/module.js',
        format: 'es',
      },
      {
        file: 'dist/module.cjs.js',
        format: 'cjs',
      },
    ];

export default commonConfig(output, true);
