import React from 'react';
import { combineMappers } from './combineMappers';

export const DefaultInteractionWrapper = ({ children }) => children;

export const getInteractionWrapper = ({ interactions, config }) => ({ children }) => {
  const { contentInteractionMappers = [], onPreviewExpand = () => {} } = config.PREVIEW || {};
  const interactionMap = combineMappers(contentInteractionMappers, onPreviewExpand);
  return interactions.reduce((child, { type, settings }) => {
    const Interaction = interactionMap[type] || DefaultInteractionWrapper;
    return <Interaction {...settings}>{child}</Interaction>;
  }, children);
};
