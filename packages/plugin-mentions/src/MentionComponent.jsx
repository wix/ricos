import React from 'react';
import PropTypes from 'prop-types';

const MentionComponent = ({ children, mention, settings, theme }) => {
  const { onMentionClick, getMentionLink } = settings;
  return onMentionClick ? (
    <a
      href={getMentionLink(mention)}
      rel="noopener noreferrer"
      className={theme.mention}
      onClick={() => onMentionClick(mention)}
    >
      {children}
    </a>
  ) : (
    <span className={theme.mentionDisabled}>{children}</span>
  );
};

MentionComponent.propTypes = {
  children: PropTypes.any,
  mention: PropTypes.object,
  settings: PropTypes.object,
  theme: PropTypes.object,
};

export default MentionComponent;
