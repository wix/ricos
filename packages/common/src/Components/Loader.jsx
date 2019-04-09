import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from '../Utils/mergeStyles';
import Context from '../Utils/Context';
import styles from '../../statics/styles/loaders.scss';

class Loader extends React.Component {
  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    return (
      <div
        className={classNames(this.props.overlayClassName, this.styles.loaderOverlay)}
        data-hook="loader"
      >
        <div
          className={classNames(this.props.loaderClassName, this.styles.loader, {
            [this.styles[this.props.type]]: this.props.type,
          })}
        />
      </div>
    );
  }
}

Loader.contextType = Context.type;

Loader.propTypes = {
  type: PropTypes.string,
  overlayClassName: PropTypes.string,
  loaderClassName: PropTypes.string,
};

Loader.defaultProps = {
  type: 'mini',
  overlayClassName: '',
  loaderClassName: '',
};

export default Loader;
