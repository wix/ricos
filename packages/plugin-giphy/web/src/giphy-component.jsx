import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GiphyViewer from './giphy-viewer';
import { DEFAULTS } from './constants';
import { GIPHY_TYPE } from './types';

class GiphyComponent extends Component {
  static type = {
    GIPHY_TYPE,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoaded: false,
    };
  }

  handleReady = () => {
    if (!this.state.isLoaded) {
      this.setState({ isLoaded: true });
    }
  };

  renderPlayer = () => {
    const { componentData, theme, settings, isMobile, setComponentUrl } = this.props;
    return (
      <GiphyViewer
        ref={this.setPlayer}
        componentData={componentData}
        theme={theme}
        settings={settings}
        isMobile={isMobile}
        setComponentUrl={setComponentUrl}
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
      <div data-hook="giphyPlayer" onClick={onClick} onKeyDown={e => this.onKeyDown(e, onClick)}>
        {this.renderPlayer()}
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

GiphyComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  setComponentUrl: PropTypes.func,
};

export { GiphyComponent as Component, DEFAULTS };
