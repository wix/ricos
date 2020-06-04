import React from 'react';
import createToolbar from './toolbar/createToolbar';
import SpoilerComponent from './spoiler-component';
import { SPOILER_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-editor-common';

const createSpoilerPlugin = (config = {}) => {
  const { helpers, t, [SPOILER_TYPE]: settings = {}, isMobile, ...rest } = config;

  const spoilerEditorStrategy = (contentBlock, callback) => {
    const SPOILER_TYPE = 'SPOILER';
    contentBlock.findStyleRanges(character => {
      return character.style.includes(SPOILER_TYPE);
    }, callback);
  };

  return createBasePlugin(
    {
      type: SPOILER_TYPE,
      toolbar: createToolbar({
        helpers,
        t,
        settings,
        isMobile,
      }),
      helpers,
      settings,
      t,
      isMobile,
      disableRightClick: config?.uiSettings?.disableRightClick,
      ...rest,
    },
    {
      decorators: [
        {
          strategy: spoilerEditorStrategy,
          component: props => <SpoilerComponent {...props} />,
        },
      ],
    }
  );
};

export { createSpoilerPlugin };
