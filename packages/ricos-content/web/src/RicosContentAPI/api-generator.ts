import { loadModules, Interface } from '@typeonly/loader';
// import { Prism, Lens, fromTraversable } from 'monocle-ts';
// import typeDescriptor from '../../statics/types.rto.json';

export const generateContentAPI = () => {
  const modules = loadModules({
    bundle: require('../../statics/types.rto.json'),
  });
  const { RichContent } = modules['./safeTypes'].namedTypes;
  console.log((RichContent as Interface).properties); // eslint-disable-line no-console
};
