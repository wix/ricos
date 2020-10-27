import React, { ComponentType } from 'react';
import { INTERACTIONS } from 'ricos-content';
import ReadMore from '../Components/ReadMore';
import SeeFullPost from '../Components/SeeFullPost';
import ImageCounter from '../Components/ImageCounter';
import { PreviewConfig } from '..';

/* eslint-disable react/prop-types */
interface GenericInteractionProps extends Record<string, unknown> {
  onPreviewExpand: PreviewConfig['onPreviewExpand'];
}
export const interactionMap = (onPreviewExpand: PreviewConfig['onPreviewExpand']) =>
  Object.entries({
    [INTERACTIONS.READ_MORE]: ReadMore,
    [INTERACTIONS.SEE_FULL_CONTENT]: SeeFullPost,
    [INTERACTIONS.IMAGE_COUNTER]: ImageCounter,
  }).reduce(
    (map, [key, Component]: [string, ComponentType]) => ({
      ...map,
      [key]: ({ children, ...props }) => (
        <Component {...{ onPreviewExpand, ...props }}>{children}</Component>
      ),
    }),
    {}
  );
