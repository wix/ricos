import React from 'react';
import PropTypes from 'prop-types';

const MentionComponent = mentionProps => {
  const { onMentionClick, getMentionLink } = mentionProps.settings;
  return onMentionClick ? (
    <a
      href={getMentionLink(mentionProps.mention)}
      rel="noopener noreferrer"
      className={mentionProps.className}
      onClick={() => onMentionClick(mentionProps.mention)}
    >
      {mentionProps.children}
    </a>
  ) : (
    <span className={mentionProps.styles.mentionDisabled}>{mentionProps.children}</span>
  );
};

MentionComponent.propTypes = {
  mentionProps: PropTypes.object,
  settings: PropTypes.object,
};

export default MentionComponent;
