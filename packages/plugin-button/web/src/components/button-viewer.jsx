/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/default-styles.scss';
import { ACTION_BUTTON_TYPE, LINK_BUTTON_TYPE } from '../types';
class ButtonViewer extends PureComponent {
  isActionButton = () => Boolean(this.props.onClick);

  onClick = args => {
    const isActionButton = this.isActionButton();
    this.props.helpers.onViewerAction?.(
      isActionButton ? ACTION_BUTTON_TYPE : LINK_BUTTON_TYPE,
      'Click'
    );
    isActionButton && this.props.onClick(args);
  };

  render() {
    const { theme } = this.props;
    this.styles = this.styles || mergeStyles({ styles, theme });
    const { url, style, target, rel, buttonText } = this.props;
    const isActionButton = this.isActionButton();
    const Component = isActionButton ? 'div' : 'a';
    let props = { className: this.styles.button_container, style };
    props = isActionButton
      ? { ...props }
      : {
          href: url,
          target,
          rel: `noopener noreferrer ${rel || ''}`.trim(),
          ...props,
        };
    return (
      <Component {...props} data-hook="buttonViewer" onClick={this.onClick}>
        <div className={this.styles.button_text}>{buttonText}</div>
      </Component>
    );
  }
}

ButtonViewer.propTypes = {
  url: PropTypes.string,
  style: PropTypes.object,
  target: PropTypes.string,
  rel: PropTypes.string,
  buttonText: PropTypes.string,
  theme: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  helpers: PropTypes.object,
};

export default ButtonViewer;
