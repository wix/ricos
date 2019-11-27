import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, validate, Context, ViewportRenderer } from 'wix-rich-content-editor-common';
import { isEqual } from 'lodash';
import schema from '../statics/data-schema.json';
import styles from '../statics/styles/giphy-viewer.scss';
import { GIPHY_TYPE, DEFAULT_RESOLUTION } from './constants';

class GiphyViewer extends Component {
  constructor(props) {
    super(props);
    validate(props.componentData, schema);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, schema);
    }
  }

  getSourceUrl = () => {
    const { componentData } = this.props;
    let { sizes } = this.context?.config?.[GIPHY_TYPE] || {};
    sizes = { ...DEFAULT_RESOLUTION, ...sizes };
    const size = this.context.isMobile ? sizes.mobile : sizes.desktop;
    switch (size) {
      case 'original':
        return componentData.gif.originalMp4 || componentData.gif.originalUrl;
      case 'downsizedSmall':
        return componentData.gif.downsizedSmallMp4 || componentData.gif.originalUrl;
      default:
        return componentData.gif.originalUrl;
    }
  };

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    const gifUrl = this.getSourceUrl();
    const { componentData } = this.props;
    /* eslint-disable jsx-a11y/no-redundant-roles */
    return (
      <ViewportRenderer>
        {gifUrl.endsWith('.mp4') ? (
          <video
            // video should be treated as an noninteractive git element
            // eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role
            role="img"
            autoPlay
            muted
            loop
            playsInline // required for autoplay in iOS
            aria-label="gif"
            className={this.styles.giphy_player}
            src={this.getSourceUrl()}
          />
        ) : (
          <img
            role="img"
            aria-label="gif"
            className={this.styles.giphy_player}
            src={componentData.gif.originalUrl}
            alt="gif"
          />
        )}
      </ViewportRenderer>
    );
    /* eslint-enable jsx-a11y/no-redundant-roles */
  }
}

GiphyViewer.contextType = Context.type;

GiphyViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  onReady: PropTypes.func,
  onStart: PropTypes.func,
  controls: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
};

GiphyViewer.defaultProps = {
  width: '100%',
  height: '100%',
  controls: true,
};

export default GiphyViewer;
