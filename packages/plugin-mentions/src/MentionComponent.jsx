import React from 'react';
import PropTypes from 'prop-types';
import { Context, mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/mentions.scss';

const MentionComponent = ({ children, mention, settings, contextType }) => {
  const { onMentionClick, getMentionLink } = settings;
  const { Consumer } = contextType || Context;
  return (
    <Consumer>
      {context => {
        const mergedStyles = mergeStyles({ theme: context.theme, styles });
        return onMentionClick ? (
          <a
            href={getMentionLink(mention)}
            rel="noopener noreferrer"
            tabIndex="0"
            className={mergedStyles.mention}
            onClick={() => onMentionClick(mention)}
          >
            {children}
          </a>
        ) : (
          <span className={mergedStyles.mentionDisabled}>{children}</span>
        );
      }}
    </Consumer>
  );
};

MentionComponent.propTypes = {
  children: PropTypes.any,
  mention: PropTypes.object,
  settings: PropTypes.object,
  contextType: PropTypes.object,
};

export default MentionComponent;
