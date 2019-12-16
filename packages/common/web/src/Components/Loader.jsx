import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { default as Context } from '../Utils/Context';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../../statics/styles/loaders.rtlignore.scss';

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get styles() {
    if (!this._styles) {
      const theme = this.context?.theme || this.props.theme;
      this._styles = mergeStyles({ styles, theme });
    }
    return this._styles;
  }

  updateProgress = (progress, localUrl) => {
    this.setState({ progress, localUrl });
  };

  componentDidMount() {
    this.context?.helpers?.onProgressChange?.(this.updateProgress);
  }

  renderProgress() {
    return (
      <div>
        {this.state.progress && (
          <div
            className={classNames(this.props.loaderClassName, this.styles.progress, {
              [this.styles[this.props.type]]: this.props.type,
            })}
          >
            {this.state.progress + '%'}
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <div
        className={classNames(this.props.overlayClassName, this.styles.loaderOverlay)}
        data-hook="loader"
        style={{
          backgroundImage: `url(${this.state?.localUrl})`,
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
};

Loader.defaultProps = {
  type: 'mini',
  overlayClassName: '',
  loaderClassName: '',
};

export default Loader;
