import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GiphyViewer from './giphy-viewer';
import { GIPHY_TYPE, DEFAULTS } from './constants';

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
    const { componentData } = this.props;
    return <GiphyViewer ref={this.setPlayer} componentData={componentData} />;
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
};

export { GiphyComponent as Component, DEFAULTS };
