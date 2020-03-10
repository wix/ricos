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

  componentDidMount() {
    this.getInfiniteLoadingPercent(this.updatePercentage);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  initiateStyles() {
    if (!this.styles) {
      const theme = this.props.theme;
      this.styles = mergeStyles({ styles, theme });
    }
  }

  updatePercentage = (progress, localUrl) => {
    this.setState({ progress, localUrl });
  };

  getInfiniteLoadingPercent = updatePercentage => {
    let percent = 1;
    updatePercentage(percent);
    this.interval = setInterval(() => {
      updatePercentage(percent);
      percent += 1;
      if (percent === 100) clearInterval(this.interval);
    }, 3500);
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
};

Loader.defaultProps = {
  type: 'mini',
  overlayClassName: '',
  loaderClassName: '',
};

export default Loader;
