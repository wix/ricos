import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/default-styles.scss';
class ButtonViewer extends PureComponent {
  render() {
    const { theme } = this.props;
    this.styles = this.styles || mergeStyles({ styles, theme });
    const { url, style, target, rel, buttonText } = this.props;
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
};

export default ButtonViewer;
