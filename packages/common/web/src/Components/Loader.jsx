import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { default as Context } from '../Utils/Context';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../../statics/styles/loaders.rtlignore.scss';

class Loader extends Component {
  state = {};

  componentDidMount() {
    this.context?.helpers?.onProgressChange?.(this.updateProgress);
  }

  initiateStyles() {
    if (!this.styles) {
      const theme = this.context?.theme || this.props.theme;
      this.styles = mergeStyles({ styles, theme });
    }
  }

  updateProgress = (progress, localUrl) => {
    this.setState({ progress, localUrl });
    if (progress === 100) {
      this.props.onLoad?.();
    }
  };

  renderProgress() {
    if (!this.state.progress) {
      return null;
    }
    return (
      <div>
        <div
          className={classNames(this.props.loaderClassName, this.styles.progress, {
            [this.styles[this.props.type]]: this.props.type,
          })}
        >
          {this.state.progress + '%'}
        </div>
      </div>
    );
  }

  render() {
    this.initiateStyles();
    return (
      <div
        className={classNames(this.props.overlayClassName, this.styles.loaderOverlay)}
        data-hook="loader"
        style={{
          backgroundImage: this.state.localUrl ? `url(${this.state.localUrl})` : null,
        }}
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

Loader.contextType = Context.type;

Loader.propTypes = {
  type: PropTypes.string,
  overlayClassName: PropTypes.string,
  loaderClassName: PropTypes.string,
  theme: PropTypes.object,
  onLoad: PropTypes.func,
};

Loader.defaultProps = {
  type: 'mini',
  overlayClassName: '',
  loaderClassName: '',
};

export default Loader;
