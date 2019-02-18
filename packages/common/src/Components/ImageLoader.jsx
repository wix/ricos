import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../../statics/styles/loaders.scss';

class ImageLoader extends React.Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render = () => (
    <div
      className={classNames(this.props.overlayClassName, this.styles.loaderOverlay)}
      data-hook="imageLoader"
    >
      <div
        className={classNames(this.props.loaderClassName, this.styles.loader, {
          [this.styles[this.props.type]]: this.props.type,
        })}
      />
    </div>
  );
}

ImageLoader.propTypes = {
  theme: PropTypes.object.isRequired,
  type: PropTypes.string,
  overlayClassName: PropTypes.string,
  loaderClassName: PropTypes.string,
};

ImageLoader.defaultProps = {
  type: 'mini',
  overlayClassName: '',
  loaderClassName: '',
};

export default ImageLoader;
