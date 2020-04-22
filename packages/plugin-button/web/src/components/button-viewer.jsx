/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/default-styles.scss';
class ButtonViewer extends PureComponent {
  render() {
    const { theme, onClickEvent } = this.props;
    this.styles = this.styles || mergeStyles({ styles, theme });
    const { url, style, target, rel, buttonText } = this.props;
    const isActionButton = Boolean(onClickEvent);

    if (isActionButton) {
      return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          className={this.styles.button_container}
          style={style}
          target={target}
          rel={rel}
          onClick={onClickEvent}
        >
          <div className={this.styles.button_text}>{buttonText}</div>
        </div>
      );
    }
    return (
      <div>
        <a
          className={this.styles.button_container}
          href={url}
          style={style}
          target={target}
          rel={rel}
        >
          <div className={this.styles.button_text}>{buttonText}</div>
        </a>
      </div>
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
  onClickEvent: PropTypes.func,
};

export default ButtonViewer;
