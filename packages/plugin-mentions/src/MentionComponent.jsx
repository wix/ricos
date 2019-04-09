import React from 'react';
import PropTypes from 'prop-types';
import { Context } from 'wix-rich-content-common';

const MentionComponent = ({ children, mention, settings, contextType }) => {
  const { onMentionClick, getMentionLink } = settings;
  const { Consumer } = contextType || Context;
  return (
    <Consumer>
      {context =>
        onMentionClick ? (
          <a
            href={getMentionLink(mention)}
            rel="noopener noreferrer"
            className={context.theme.mention}
            onClick={() => onMentionClick(mention)}
          >
            {children}
          </a>
        ) : (
          <span className={context.theme.mentionDisabled}>{children}</span>
        )
      }
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
