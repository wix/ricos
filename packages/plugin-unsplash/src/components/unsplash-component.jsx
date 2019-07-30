/* eslint-disable no-undef */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UnsplashViewer from './unsplash-viewer';
import { UNSPLASH_TYPE } from '../constants';

class UnsplashComponent extends Component {
  static type = {
    UNSPLASH_TYPE,
  };

  constructor(props) {
    super(props);
    const isPlayable = !props.blockProps || props.blockProps.readOnly === true;
    this.state = {
      isLoading: false,
      isLoaded: false,
      isPlayable,
    };
  }

  handleReady = () => {
    if (!this.state.isLoaded) {
      this.setState({ isLoaded: true });
    }
  };

  renderPlayer = () => {
    const {
      componentData,
      t,
      blockProps: { isFocused },
    } = this.props;
    return (
      <UnsplashViewer
        ref={this.setPlayer}
        componentData={componentData}
        defaultCaption={t('ImageViewer_Caption')}
        isFocused={isFocused}
      />
    );
  };

  onKeyDown = (e, handler) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handler();
    }
  };

  render() {
    const { onClick } = this.props;
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div data-hook="unsplashPlayer" onClick={onClick} onKeyDown={e => this.onKeyDown(e, onClick)}>
        {this.renderPlayer()}
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

UnsplashComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export { UnsplashComponent as Component };
