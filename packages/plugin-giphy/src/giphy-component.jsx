import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import GiphyViewer from './giphy-viewer';
import { GIPHY_TYPE } from './constants';
import styles from '../statics/styles/giphy-viewer.scss';

class GiphyComponent extends Component {
  static type = {
    GIPHY_TYPE
  };

  constructor(props) {
    super(props);
    const isPlayable = !props.blockProps || props.blockProps.readOnly === true;
    this.state = {
      isLoading: false,
      isLoaded: false,
      isPlayable
    };
    this.styles = mergeStyles({ styles, theme: this.props.theme });
  }

  handleReady = () => {
    if (!this.state.isLoaded) {
      this.setState({ isLoaded: true });
    }
  };

  renderPlayer = () => {
    const { componentData } = this.props;
    return (
      <GiphyViewer
        ref={this.setPlayer}
        componentData={componentData}
      />
    );
  };

  onKeyDown = (e, handler) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handler();
    }
  };

  render() {
    const { styles } = this;
    const { className, onClick } = this.props;
    const containerClassNames = classNames(styles.giphy_container, className || '');
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        data-hook="giphyPlayer"
        onClick={onClick}
        className={containerClassNames}
        onKeyDown={e => this.onKeyDown(e, onClick)}
      >
        {this.renderPlayer()}
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

GiphyComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func
};

export { GiphyComponent as Component };
