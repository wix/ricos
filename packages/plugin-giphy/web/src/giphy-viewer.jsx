import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, validate } from 'wix-rich-content-common';
// eslint-disable-next-line max-len
import pluginGiphySchema from 'wix-rich-content-common/dist/statics/schemas/plugin-giphy.schema.json';
import { isEqual } from 'lodash';
import styles from '../statics/styles/giphy-viewer.scss';
import { DEFAULT_RESOLUTION } from './constants';

class GiphyViewer extends Component {
  constructor(props) {
    super(props);
    validate(props.componentData, pluginGiphySchema);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, pluginGiphySchema);
    }
  }

  getSourceUrl = () => {
    const {
      componentData: { gif },
      isMobile,
      settings = {},
    } = this.props;

    if (!gif) {
      return null;
    }

    const { mobile, desktop } = { ...DEFAULT_RESOLUTION, ...settings };
    const size = isMobile ? mobile : desktop;
    const { originalMp4, originalUrl, downsizedSmallMp4 } = gif;

    const mapping = {
      original: originalMp4,
      downsizedSmall: downsizedSmallMp4,
    };
    return mapping[size] || originalUrl;
  };

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    const { componentData, setComponentUrl } = this.props;
    const gifUrl = this.getSourceUrl();
    if (!gifUrl) {
      return null;
    }
    setComponentUrl?.(gifUrl);
    // video should be treated as an noninteractive git element
    /* eslint-disable jsx-a11y/no-redundant-roles, jsx-a11y/no-interactive-element-to-noninteractive-role*/
    return gifUrl.endsWith('.mp4') ? (
      <video
        role="img"
        autoPlay
        muted
        loop
        playsInline // required for autoplay in iOS
        aria-label="gif"
        className={this.styles.giphy_player}
        src={gifUrl}
      />
    ) : (
      <img
        role="img"
        aria-label="gif"
        className={this.styles.giphy_player}
        src={componentData.gif.originalUrl}
        alt="gif"
      />
    );
    /* eslint-enable jsx-a11y/no-redundant-roles, jsx-a11y/no-interactive-element-to-noninteractive-role */
  }
}

GiphyViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  onReady: PropTypes.func,
  onStart: PropTypes.func,
  controls: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  settings: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  setComponentUrl: PropTypes.func,
};

GiphyViewer.defaultProps = {
  width: '100%',
  height: '100%',
  controls: true,
};

export default GiphyViewer;
