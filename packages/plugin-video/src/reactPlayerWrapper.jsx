import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

export default class ReactPlayerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requireVimeo: isVimeoUrl(props.url) && !window[VIMEO_GLOBAL] && window.requirejs,
    };
  }

  componentDidMount() {
    if (this.state.requireVimeo) {
      window.require([VIMEO_SDK_URL], player => {
        window.Vimeo = { Player: player };
        this.setState({ requireVimeo: false });
      });
    }
  }

  render() {
    if (this.state.requireVimeo) {
      return null;
    }
    return <ReactPlayer {...this.props} />;
  }
}

ReactPlayerWrapper.propTypes = {
  url: PropTypes.string.isRequired,
};

const VIMEO_SDK_URL = 'https://player.vimeo.com/api/player.js';
const VIMEO_GLOBAL = 'Vimeo';

function isVimeoUrl(url) {
  //this is for react player, regex taken from there https://github.com/CookPete/react-player/blob/ad5d6df62635497137a184cf93a9c43ba6b08fbb/src/players/Vimeo.js#L8
  const MATCH_URL = /vimeo\.com\/.+/;
  const MATCH_FILE_URL = /vimeo\.com\/external\/[0-9]+\..+/;
  if (MATCH_FILE_URL.test(url)) {
    return false;
  }
  return MATCH_URL.test(url);
}