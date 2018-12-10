import { decorateComponentWithProps } from 'wix-rich-content-common';
import { MENTION_TYPE } from './types';
import MentionViewer from './MentionViewer';

export const createTypeMapperFactory = ({ settings, theme }) =>
  () => ({
    [MENTION_TYPE]: {
      component: decorateComponentWithProps(MentionViewer, { settings, theme }),
      elementType: 'inline'
    },
  });
