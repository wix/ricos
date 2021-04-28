import React, { FunctionComponent, KeyboardEventHandler } from 'react';
import { mergeStyles, RichContentTheme } from 'wix-rich-content-common';
import styles from '../statics/mentions.scss';
import cx from 'classnames';
import { Mention, Settings } from './createMentionsPlugin';

interface Props {
  mention: Mention;
  settings: Settings;
  theme: RichContentTheme;
}

const MentionComponent: FunctionComponent<Props> = ({ children, mention, settings, theme }) => {
  const { onMentionClick, onMentionHover, getMentionLink } = settings;
  const mergedStyles = mergeStyles({ theme, styles });
  const ref = React.useRef(null);
  const onMouseOver = () => onMentionHover?.(mention, ref.current);
  const onClick = () => onMentionClick?.(mention);
  const onKeyDown: KeyboardEventHandler = e => (e.key === 'Enter' || e.key === ' ') && onClick();
  const commonProps = {
    ref,
    onMouseOver,
    className: cx(mergedStyles.mention, theme.mentionPalette),
  };

  if (onMentionClick) {
    return (
      <span {...commonProps} role="link" tabIndex={0} onKeyDown={onKeyDown} onClick={onClick}>
        {children}
      </span>
    );
  } else if (getMentionLink) {
    return (
      <a {...commonProps} href={getMentionLink(mention)} rel="noopener noreferrer" tabIndex={0}>
        {children}
      </a>
    );
  } else {
    return <span {...commonProps}>{children}</span>;
  }
};

export default MentionComponent;
