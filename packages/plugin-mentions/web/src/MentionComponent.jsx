import React from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/mentions.scss';
import cx from 'classnames';

const MentionComponent = ({ children, mention, settings, theme }) => {
  const { onMentionClick, getMentionLink } = settings;
  const mergedStyles = mergeStyles({ theme, styles });
  const onClick = () => onMentionClick(mention);
  const onKeyDown = e => (e.key === 'Enter' || e.key === ' ') && onClick();
  if (onMentionClick) {
    return (
      <span
        role="link"
        tabIndex="0"
        onKeyDown={onKeyDown}
        onClick={onClick}
        className={cx(mergedStyles.mention, theme.mentionPalette)}
      >
        {children}
      </span>
    );
  } else if (getMentionLink) {
    return (
      <a
        href={getMentionLink(mention)}
        rel="noopener noreferrer"
        tabIndex="0"
        className={cx(mergedStyles.mention, theme.mentionPalette)}
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
