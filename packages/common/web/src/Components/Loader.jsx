import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { default as Context } from '../Utils/Context';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../../statics/styles/loaders.rtlignore.scss';

class Loader extends React.Component {
  get styles() {
    if (!this._styles) {
      const theme = this.context?.theme || this.props.theme;
      this._styles = mergeStyles({ styles, theme });
    }
    return this._styles;
  }

  render() {
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
  theme: PropTypes.object,
};

Loader.defaultProps = {
  type: 'mini',
  overlayClassName: '',
  loaderClassName: '',
};

export default Loader;
