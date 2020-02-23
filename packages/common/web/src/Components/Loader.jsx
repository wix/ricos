import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../../statics/styles/loaders.rtlignore.scss';

class Loader extends React.Component {
  state = {};

  componentDidMount() {
    this.props?.helpers?.onProgressChange?.(this.updateProgress);
  }

  initiateStyles() {
    if (!this.styles) {
      const theme = this.props.theme;
      this.styles = mergeStyles({ styles, theme });
    }
  }
  updateProgress = (progress, localUrl) => {
    this.setState({ progress, localUrl });
    if (progress >= 100) {
      this.props?.onLoad?.(false);
    } else {
      this.props?.onLoad?.(true);
    }
  };

  renderProgress() {
    return (
      <div>
        <div
          className={classNames(this.props.loaderClassName, this.styles.progress, {
            [this.styles[this.props.type]]: this.props.type,
          })}
        >
          {`${this.state.progress}%`}
        </div>
      </div>
    );
  }

  render() {
    this.initiateStyles();
    const style = this.state.localUrl
      ? {
          backgroundImage: `url(${this.state.localUrl})`,
        }
      : {};
    return (
      <div
        className={classNames(this.props.overlayClassName, this.styles.loaderOverlay)}
        data-hook="loader"
        style={style}
      >
        <div
          className={classNames(this.props.loaderClassName, this.styles.loader, {
            [this.styles[this.props.type]]: this.props.type,
          })}
        />
        {typeof this.state.progress === 'number' && this.renderProgress()}
      </div>
    );
  }
}

Loader.propTypes = {
  type: PropTypes.string,
  overlayClassName: PropTypes.string,
  loaderClassName: PropTypes.string,
  theme: PropTypes.object.isRequired,
  onLoad: PropTypes.func,
};

Loader.defaultProps = {
  type: 'mini',
  overlayClassName: '',
  loaderClassName: '',
};

export default Loader;
