import IndentViewer from './indent-viewer';
import { INDENT_TYPE } from './types';

export const typeMapper = () => ({
  [INDENT_TYPE]: { component: IndentViewer },
});
