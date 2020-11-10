import { resolve as pathResolve } from 'path';
import svgr from '@svgr/rollup';
import resolvePlugin from 'rollup-plugin-node-resolve';
import aliasPlugin from '@rollup/plugin-alias';
import copyPlugin from 'rollup-plugin-copy';
/* @ts-ignore typescript-plugin external types issue */
import babelPlugin from 'rollup-plugin-babel';
import typescriptPlugin from 'rollup-plugin-typescript2';
import commonjsPlugin from 'rollup-plugin-commonjs';
import jsonPlugin from '@rollup/plugin-json';
import postcssPlugin from 'rollup-plugin-postcss';
/* @ts-ignore typescript-plugin external types issue */
import postcssExclude from 'postcss-exclude-files';
import postcssURL from 'postcss-url';
/* @ts-ignore typescript-plugin external types issue */
import postcssRTL from 'postcss-rtl';
import replacePlugin from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import visualizerPlugin from 'rollup-plugin-visualizer';
import { Plugin } from 'rollup';

const IS_DEV_ENV = process.env.NODE_ENV === 'development';

const resolve = (): Plugin => {
  return resolvePlugin({
    preferBuiltins: true,
    extensions: ['.js', '.jsx', '.json'],
  });
};

const resolveAlias = (): Plugin => {
  return aliasPlugin({
    entries: {
      'draft-js': '@wix/draft-js',
    },
  });
};

const copy = (): Plugin => {
  const targets = [{ src: 'statics', dest: 'dist' }];
  return copyPlugin({
    targets,
    copyOnce: true,
  });
};

const copyAfterBundleWritten = (): Plugin => {
  const targets = [
    // create cjs version for lib declaration files
    {
      src: ['dist/lib/*.d.ts', '!dist/lib/*.cjs.d.ts'],
      dest: 'dist/lib',
      rename: (name: string) => `${name.replace('.d', '')}.cjs.d.ts`,
    },
    // create viewer entry point declaration files
    {
      src: 'dist/src/viewer.d.ts',
      dest: 'dist',
      rename: () => 'module.viewer.d.ts',
      transform: () => "export * from './src/viewer';", // eslint-disable-line quotes
    },
    // create cjs version for viewer entry point declaration files
    {
      src: 'dist/module.viewer.d.ts',
      dest: 'dist',
      rename: () => 'module.viewer.cjs.d.ts',
    },
  ];

  return copyPlugin({
    targets,
    copyOnce: true,
    hook: 'writeBundle',
  });
};

const babel = (): Plugin => {
  return babelPlugin({
    configFile: pathResolve(__dirname, 'babel.config.js'),
    include: ['src/**', 'lib/**'],
    runtimeHelpers: true,
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  });
};

const typescript = (): Plugin => {
  const absPath = (dir: string) => `${process.cwd()}/${dir}`;
  return typescriptPlugin({
    useTsconfigDeclarationDir: true,
    check: !!process.env.GITHUB_ACTIONS,
    tsconfig: `${__dirname}/tsconfig.json`,
    tsconfigOverride: {
      compilerOptions: {
        declarationDir: absPath('dist'),
        rootDir: absPath(''),
      },
      include: [
        'src',
        'src/**/*.json',
        'statics/**/*.json',
        'statics/**/*.schema.json',
        'package.json',
        'lib',
      ].map(path => absPath(path)),
      exclude: ['node_modules', '**/*.spec.*'].map(path => absPath(path)),
    },
    // debugging options:
    // verbosity: 3,
    // clean: true,
  });
};

const commonjs = (): Plugin => {
  const named = [
    {
      path: 'node_modules/image-client-api/dist/imageClientSDK.js',
      exportList: ['getScaleToFillImageURL', 'getScaleToFitImageURL'],
    },
    {
      path: 'node_modules/immutable/dist/immutable.js',
      exportList: ['List', 'OrderedSet', 'Map'],
    },
    {
      path: 'node_modules/draft-js/lib/Draft.js',
      exportList: [
        'SelectionState',
        'Modifier',
        'EditorState',
        'AtomicBlockUtils',
        'RichUtils',
        'convertToRaw',
        'convertFromRaw',
        'getVisibleSelectionRect',
        'DefaultDraftBlockRenderMap',
        'KeyBindingUtil',
        'genKey',
        'ContentBlock',
        'BlockMapBuilder',
        'CharacterMetadata',
        'ContentState',
        'Entity',
        'RawDraftContentState',
        'EditorChangeType',
        'convertFromHTML',
      ],
    },
  ];

  const relativePath = '../../../';

  const namedExports: { [packageName: string]: string[] } = {};
  named.forEach(({ path, exportList }) => {
    namedExports[path] = exportList;
    namedExports[relativePath + path] = exportList;
  });
  return commonjsPlugin({ namedExports });
};

const json = (): Plugin => {
  return jsonPlugin({
    include: [
      'statics/**',
      'node_modules/**',
      '../../../node_modules/**',
      '../../../packages/**/package.json',
    ],
  });
};

const postcss = (shouldExtract: boolean): Plugin => {
  return postcssPlugin({
    minimize: {
      // reduceIdents: false,
      // safe: true,
      /*  @ts-ignore: cssnanoOptions typing is wrong */
      normalizeWhitespace: false,
    },
    modules: {
      generateScopedName: IS_DEV_ENV ? '[name]__[local]___[hash:base64:5]' : '[hash:base64:5]',
    },
    extract: shouldExtract && 'dist/styles.min.css',
    plugins: [
      postcssExclude({
        filter: '**/*.rtlignore.scss',
        plugins: [postcssRTL()],
      }),
      postcssURL({
        url: asset => asset.url.replace('../', '/statics/'),
      }),
    ],
  });
};

const replace = (): Plugin => {
  return replacePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  });
};

const uglify = (): Plugin => {
  return terser({
    mangle: false,
  });
};

const visualizer = (): Plugin => {
  return visualizerPlugin({
    sourcemap: true,
  });
};

let _plugins: Plugin[] = [
  svgr(),
  resolveAlias(),
  resolve(),
  copy(),
  typescript(),
  babel(),
  commonjs(),
  json(),
  copyAfterBundleWritten(),
];

if (!IS_DEV_ENV) {
  _plugins = [..._plugins, replace()];
}

if (process.env.MODULE_ANALYZE_EDITOR || process.env.MODULE_ANALYZE_VIEWER) {
  _plugins = [..._plugins, visualizer()];
}

const plugins = (shouldExtractCss: boolean) => {
  _plugins.push(postcss(shouldExtractCss));
  return _plugins;
};
export { plugins };
