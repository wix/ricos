/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC, useCallback, useMemo } from 'react';
import { mergeStyles, Helpers, RichContentTheme } from 'wix-rich-content-common';
import Styles from '../../statics/styles/default-styles.scss';
import { ACTION_BUTTON_TYPE, LINK_BUTTON_TYPE } from '../types';
import { merge } from 'lodash';

interface Props {
  style: Record<string, unknown>;
  onClick?: React.DOMAttributes<HTMLAnchorElement>['onClick'] &
    React.DOMAttributes<HTMLDivElement>['onClick'];
  helpers: Helpers;
  theme: RichContentTheme;
  url: string;
  target: HTMLAnchorElement['target'];
  rel: HTMLAnchorElement['rel'];
  buttonText: string;
}

const ButtonViewer: FC<Props> = ({
  style,
  onClick,
  theme,
  helpers,
  url,
  target,
  rel,
  buttonText,
}) => {
  const styles = mergeStyles({ styles: Styles, theme });
  const isActionButton = useMemo(() => Boolean(onClick), [onClick]);
  const onClickHandler: Props['onClick'] = useCallback(
    args => {
      helpers.onViewerAction?.(isActionButton ? ACTION_BUTTON_TYPE : LINK_BUTTON_TYPE, 'Click', '');
      if (isActionButton) {
        onClick?.(args);
      }
    },
    [helpers.onViewerAction]
  );
  const Component = isActionButton ? 'div' : 'a';
  const props = merge(
    { className: styles.button_container, style },
    isActionButton && { href: url, target, rel }
  );
  return (
    <Component {...props} data-hook="buttonViewer" onClick={onClickHandler}>
      <div className={styles.button_text}>{buttonText}</div>
    </Component>
  );
};

export default ButtonViewer;
