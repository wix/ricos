import { buildOptimizer } from '@angular-devkit/build-optimizer';

type RawSourceMap = {
  version: number;
  sources: string[];
  names: string[];
  sourcesContent?: string[];
  mappings: string;
};

type Options = {
  extensions?: string[];
  IS_DEV_ENV?: boolean;
};

export const buildOptimizerPlugin = (options: Options) => {
  return {
    name: 'build-optimizer',
    transform: (content: string, id: string): { code: string; map: RawSourceMap } | null => {
      const { extensions = ['.js', '.jsx', '.ts', '.tsx'], IS_DEV_ENV = false } = options;
      if (extensions.some(extension => id.endsWith(extension))) {
        const { content: code, sourceMap: map } = buildOptimizer({
          content,
          inputFilePath: id,
          emitSourceMap: true,
        });
        if (!code) {
          if (IS_DEV_ENV) {
            // eslint-disable-next-line no-console
            console.error('no transforms produced by buildOptimizer for ' + id);
          }
          return null;
        }
        if (!map) {
          throw new Error('no sourcemap produced by buildOptimizer');
        }

        return { code, map };
      }
      return null;
    },
  };
};
