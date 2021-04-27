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
  const { onMentionClick, onMentionHover, getMentionLink } = settings;
  const mergedStyles = mergeStyles({ theme, styles });
  const ref = React.useRef<HTMLDivElement | null>(null);
  const onMouseOver = () => onMentionHover?.(mention, ref.current);
  const onClick = () => onMentionClick?.(mention);
  const onKeyDown: KeyboardEventHandler = e => (e.key === 'Enter' || e.key === ' ') && onClick();
  if (onMentionClick) {
    return (
      <span
        ref={ref}
        role="link"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onMouseOver={onMouseOver}
        className={cx(mergedStyles.mention, theme.mentionPalette)}
      >
        {children}
      </span>
    );
  } else if (getMentionLink) {
    return (
      <a
        ref={ref}
        href={mention && getMentionLink(mention)}
        rel="noopener noreferrer"
        tabIndex={0}
        onMouseOver={onMouseOver}
        className={cx(mergedStyles.mention, theme.mentionPalette)}
      >
        {children}
      </a>
    );
  } else {
    return (
      <span ref={ref} onMouseOver={onMouseOver} className={mergedStyles.mentionDisabled}>
        {children}
      </span>
    );
  }
};

export default MentionComponent;
