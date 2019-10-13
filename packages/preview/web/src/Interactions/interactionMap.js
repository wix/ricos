import React from 'react';
import { INTERACTIONS } from '../const';
import ReadMore from '../Components/ReadMore';
import SeeFullPost from '../Components/SeeFullPost';
import ImageCounter from '../Components/ImageCounter';

export const interactionMap = (mergedStyles, onPreviewExpand) => ({
  [INTERACTIONS.READ_MORE]: ({ children, ...props }) => ( // eslint-disable-line
    <ReadMore styles={mergedStyles} onPreviewExpand={onPreviewExpand} {...props}>
      {children}
    </ReadMore>
  ),
  [INTERACTIONS.SEE_FULL_CONTENT]: ({ children, ...props }) => ( // eslint-disable-line
    <SeeFullPost styles={mergedStyles} onPreviewExpand={onPreviewExpand} {...props}>
      {children}
    </SeeFullPost>
  ),
  [INTERACTIONS.IMAGE_COUNTER]: ({ children, ...props }) => ( // eslint-disable-line
    <ImageCounter styles={mergedStyles} onPreviewExpand={onPreviewExpand} {...props}>
      {children}
    </ImageCounter>
  ),
});
