import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../Styles/loaders.scss';

class ImageLoader extends React.Component {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render = () => (
    <div className={this.styles.loaderOverlay}>
      <div className={classNames(this.styles.loader, { [this.styles[this.props.type]]: this.props.type })} />
    </div>
  );
}

ImageLoader.propTypes = {
  theme: PropTypes.object.isRequired,
  type: PropTypes.string,
  overlayClassName: PropTypes.string,
  loaderClassName: PropTypes.string
};

ImageLoader.defaultProps = {
  type: 'mini'
};

export default ImageLoader;
