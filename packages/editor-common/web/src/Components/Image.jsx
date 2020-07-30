import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../../statics/styles/image.scss';
import { mergeStyles } from 'wix-rich-content-common';
import ErrorMsgWithIcon from './ErrorMsgWithIcon';

class Image extends Component {
  static propTypes = {
    resizeMode: PropTypes.oneOf(['contain', 'cover']),
    src: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    className: PropTypes.string,
    alt: PropTypes.string,
    errorMsg: PropTypes.string,
  };

  static defaultProps = {
    resizeMode: 'contain',
  };

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { styles } = this;
    const { src, resizeMode, className, alt, errorMsg } = this.props;
    const imageStyle = {
      backgroundImage: `url(${src})`,
      backgroundSize: resizeMode,
    };
    return (
      <div className={classNames(styles.image_container, className)} style={imageStyle}>
        <img src={src} className={styles.image_placeholder} alt={alt} />
        {errorMsg && <ErrorMsgWithIcon errorMsg={errorMsg} />}
      </div>
    );
  }
}

export default Image;
