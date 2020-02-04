import React from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/mentions.scss';

const MentionComponent = ({ children, mention, settings, theme }) => {
  const { onMentionClick, getMentionLink } = settings;
  const mergedStyles = mergeStyles({ theme, styles });
  if (onMentionClick) {
    return (
      <a
        href={getMentionLink(mention)}
        rel="noopener noreferrer"
        tabIndex="0"
        className={mergedStyles.mention}
        onClick={() => onMentionClick(mention)}
      >
        {children}
      </a>
    );
  } else {
    return <span className={mergedStyles.mentionDisabled}>{children}</span>;
  }
};

MentionComponent.propTypes = {
  children: PropTypes.any,
  mention: PropTypes.object,
  settings: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default MentionComponent;
