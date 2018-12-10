import React from 'react';
import MentionComponent from './MentionComponent';

const MentionViewer = props =>
  <MentionComponent mention={props.componentData.mention} {...props} />;

export default MentionViewer;
