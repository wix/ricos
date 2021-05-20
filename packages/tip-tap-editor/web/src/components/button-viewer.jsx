/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/default-styles.scss';
class ButtonViewer extends PureComponent {
  render() {
    const { theme, onClick } = this.props;
    this.styles = this.styles || mergeStyles({ styles, theme });
    const { url, style, target, rel, buttonText } = this.props;
    const isActionButton = Boolean(onClick);
    const Component = isActionButton ? 'div' : 'a';
    let props = { className: this.styles.button_container, style };
    props = isActionButton
      ? { onClick, ...props }
      : {
          href: url,
          target,
          rel,
          ...props,
        };
    return (
      <Component {...props} data-hook="buttonViewer">
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
};

export default ButtonViewer;
