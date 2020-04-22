import React from 'react';
import { INTERACTIONS } from '../const';
import ReadMore from '../Components/ReadMore';
import SeeFullPost from '../Components/SeeFullPost';
import ImageCounter from '../Components/ImageCounter';

/* eslint-disable react/prop-types */
export const interactionMap = onPreviewExpand =>
  Object.entries({
    [INTERACTIONS.READ_MORE]: ReadMore,
    [INTERACTIONS.SEE_FULL_CONTENT]: SeeFullPost,
    [INTERACTIONS.IMAGE_COUNTER]: ImageCounter,
  }).reduce(
    (map, [key, Component]) => ({
      ...map,
      [key]: ({ children, ...props }) => (
        <Component onPreviewExpand={onPreviewExpand} {...props}>
          {children}
        </Component>
      ),
    }),
    {}
  );
