import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/loaders.rtlignore.scss';
const styleLoader = {
  position: 'absolute',
  top: '0',
};

class Loader extends React.Component {
  state = {};
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    this.getInfiniteLoadingPercent(this.updatePercentage);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  initiateStyles() {
    if (!this.styles) {
      const theme = this.props.theme;
      this.styles = mergeStyles({ styles, theme });
    }
  }

  updatePercentage = (progress, localUrl) => {
    if (this._isMounted) {
      this.setState({ progress, localUrl });
      if (progress >= 100) {
        this.props?.onLoad?.(false);
      }
    }
  };

  getInfiniteLoadingPercent = updatePercentage => {
    let percent = 1;
    updatePercentage(percent);
    const interval = setInterval(() => {
      updatePercentage(percent);
      percent += 1;
      if (percent === 100) clearInterval(interval);
    }, 3500);
  };

  setLocalUrl = localUrl => {
    if (this._isMounted) {
      this.setState({ localUrl });
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
      ? { ...styleLoader, backgroundImage: `url(${this.state.localUrl})` }
      : styleLoader;
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
        {this.renderProgress()}
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
