import React from 'react';
import { isArray } from 'lodash';
import { getInteractionWrapper } from './utils/getInteractionWrapper';

export const withInteraction = (element, interactions, context) => {
  const { config } = context;
  if (
    !config.PREVIEW?.contentInteractionMappers?.length ||
    !config.PREVIEW.onPreviewExpand ||
    !isArray(interactions)
  ) {
    return element;
  }
  const BlockInteractionWrapper = getInteractionWrapper({ interactions, context });
  return <BlockInteractionWrapper>{element}</BlockInteractionWrapper>;
};
