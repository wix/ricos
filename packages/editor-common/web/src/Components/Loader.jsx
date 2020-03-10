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
  state = { percent: 0 };

  componentDidMount() {
    this.updateProgress();
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  initiateStyles() {
    if (!this.styles) {
      const theme = this.props.theme;
      this.styles = mergeStyles({ styles, theme });
    }
  }

  timeoutStep = 3;
  updateProgress = () => {
    this.timerId = setTimeout(() => {
      this.timeoutStep += (this.timeoutStep * this.timeoutStep) / 100;
      this.setState({ percent: this.state.percent + 1 });
      this.updateProgress();
    }, Math.floor(this.timeoutStep * 1000));
  };

  renderProgress() {
    return (
      <div>
        <div
          className={classNames(this.styles.progress, {
            [this.styles[this.props.type]]: this.props.type,
          })}
        >
          {`${this.state.percent}%`}
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
      <div className={classNames(this.styles.loaderOverlay)} data-hook="loader" style={style}>
        <div
          className={classNames(this.styles.loader, {
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
  theme: PropTypes.object.isRequired,
};

Loader.defaultProps = {
  type: 'mini',
};

export default Loader;
