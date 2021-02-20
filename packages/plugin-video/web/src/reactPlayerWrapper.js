import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { isSSR } from 'wix-rich-content-common';

const VIMEO_SDK_URL = 'https://player.vimeo.com/api/player.js';
const VIMEO_GLOBAL = 'Vimeo';

export default class ReactPlayerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vimeoLoaded: false,
      isPlaying: false,
    };
  }

  isVimeoAndRequireJS = () =>
    !isSSR() && isVimeoUrl(this.props.url) && !window[VIMEO_GLOBAL] && window.requirejs;

  componentDidMount() {
    if (this.isVimeoAndRequireJS()) {
      window.require([VIMEO_SDK_URL], player => {
        window.Vimeo = { Player: player };
        this.setState({ vimeoLoaded: true });
      });
    }
  }

  render() {
    if (!this.state.vimeoLoaded && this.isVimeoAndRequireJS()) {
      return null;
    }
    const { isPlayable, styles, disabled } = this.props;

    return (
      <ReactPlayer
        playing={this.state.isPlaying && !disabled}
        onPlay={() => this.setState({ isPlaying: true })}
        onPause={() => this.setState({ isPlaying: false })}
        style={styles}
        {...this.props}
        light={!isPlayable}
      />
    );
  }
}

ReactPlayerWrapper.propTypes = {
  url: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  isPlayable: PropTypes.bool,
  styles: PropTypes.object,
};

ReactPlayerWrapper.defaultProps = {
  isPlayable: true,
};

function isVimeoUrl(url) {
  //this is for react player, regex taken from there https://github.com/CookPete/react-player/blob/ad5d6df62635497137a184cf93a9c43ba6b08fbb/src/players/Vimeo.js#L8
  const MATCH_URL = /vimeo\.com\/.+/;
  const MATCH_FILE_URL = /vimeo\.com\/external\/[0-9]+\..+/;
  return !MATCH_FILE_URL.test(url) && MATCH_URL.test(url);
}
