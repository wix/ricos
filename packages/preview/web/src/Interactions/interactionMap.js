import React from 'react';
import { INTERACTIONS } from '../const';
import ReadMore from '../Components/ReadMore';

export const interactionMap = (mergedStyles, onPreviewExpand) => ({
  [INTERACTIONS.READ_MORE]: ({ children, ...props }) => ( // eslint-disable-line
    <ReadMore styles={mergedStyles} onPreviewExpand={onPreviewExpand} {...props}>
      {children}
    </ReadMore>
  ),
});
