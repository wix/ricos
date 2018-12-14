import React from 'react';
import { mergeStyles } from "wix-rich-content-common"
import MentionComponent from './MentionComponent';
import Styles from "../statics/mentions.scss"

const MentionViewer = props => {
  const theme = mergeStyles({ styles: Styles, theme: props.theme });
  return <MentionComponent mention={props.componentData.mention} {...props} theme={theme} />;
}

export default MentionViewer;
