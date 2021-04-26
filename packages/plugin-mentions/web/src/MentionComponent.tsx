import React, { FunctionComponent, KeyboardEventHandler } from 'react';
import { mergeStyles, RichContentTheme } from 'wix-rich-content-common';
import styles from '../statics/mentions.scss';
import cx from 'classnames';
import { Mention, Settings } from './createMentionsPlugin';

interface Props {
  mention?: Mention;
  settings: Settings;
  theme: RichContentTheme;
}

const MentionComponent: FunctionComponent<Props> = ({ children, mention, settings, theme }) => {
  const { onMentionClick, getMentionLink } = settings;
  const mergedStyles = mergeStyles({ theme, styles });
  const onClick = () => onMentionClick?.(mention);
  const onKeyDown: KeyboardEventHandler = e => (e.key === 'Enter' || e.key === ' ') && onClick();
  if (onMentionClick) {
    return (
      <span
        role="link"
        tabIndex={0}
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
        href={mention && getMentionLink(mention)}
        rel="noopener noreferrer"
        tabIndex={0}
        className={cx(mergedStyles.mention, theme.mentionPalette)}
      >
        {children}
      </a>
    );
  } else {
    return <span className={mergedStyles.mentionDisabled}>{children}</span>;
  }
};

export default MentionComponent;
