/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import { mergeStyles, Helpers, RichContentTheme } from 'wix-rich-content-common';
import Styles from '../../statics/styles/default-styles.scss';
import { ACTION_BUTTON_TYPE, LINK_BUTTON_TYPE } from '../types';
import { merge } from 'lodash';

interface Props {
  style: Record<string, unknown>;
  onClick: React.DOMAttributes<HTMLAnchorElement>['onClick'] &
    React.DOMAttributes<HTMLDivElement>['onClick'];
  helpers: Helpers;
  theme: RichContentTheme;
  url: string;
  target: HTMLAnchorElement['target'];
  rel: HTMLAnchorElement['rel'];
  buttonText: string;
}

class ButtonViewer extends PureComponent<Props> {
  styles: Record<string, string>;

  constructor(props: Props) {
    super(props);
    const { theme } = this.props;
    this.styles = mergeStyles({ styles: Styles, theme });
  }

  isActionButton = () => Boolean(this.props.onClick);

  onClick: Props['onClick'] = args => {
    const isActionButton = this.isActionButton();
    this.props.helpers.onViewerAction?.(
      isActionButton ? ACTION_BUTTON_TYPE : LINK_BUTTON_TYPE,
      'Click',
      ''
    );
    if (isActionButton) {
      this.props.onClick?.(args);
    }
  };

  render() {
    const { url, style, target, rel, buttonText } = this.props;
    const isActionButton = this.isActionButton();
    const Component = isActionButton ? 'div' : 'a';
    const props = merge(
      { className: this.styles.button_container, style },
      isActionButton && { href: url, target, rel }
    );
    return (
      <Component {...props} data-hook="buttonViewer" onClick={this.onClick}>
        <div className={this.styles.button_text}>{buttonText}</div>
      </Component>
    );
  }
}

export default ButtonViewer;
