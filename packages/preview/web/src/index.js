import React from 'react';
import { INTERACTIONS } from './const';
import ReadMore from './Components/ReadMore';

export { default as ContentStateTransformation } from './RuleEngine/ContentStateTransformation';
export const interactionMap = mergedStyles => ({
  [INTERACTIONS.READ_MORE]: ({ children, ...props }) => (
    <ReadMore styles={mergedStyles} {...props}>
      {children}
    </ReadMore>
  ),
});
