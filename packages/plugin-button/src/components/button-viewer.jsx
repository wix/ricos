import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/default-styles.scss';
class ButtonViewer extends PureComponent {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { url, style, target, rel, buttonText, errorMessage } = this.props;
    return (
      <div>
        <a
          className={styles.button_container}
          href={url}
          style={style}
          target={target}
          rel={rel}
        >
          <div className={styles.button_text}>
            {
              buttonText
            }
          </div>
          {errorMessage}
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
  errorOverlay: PropTypes.object,
  errorMessage: PropTypes.object

};

export default ButtonViewer;
