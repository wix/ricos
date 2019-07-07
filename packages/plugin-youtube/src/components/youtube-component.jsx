import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, Context } from 'wix-rich-content-common';
import YoutubeViewer from './youtube-viewer';
import styles from '../../statics/styles/youtube-component.scss';
import classNames from 'classnames';

class YoutubeComponent extends Component {
  renderOverlay = (styles, t) => {
    const overlayText = t('VideoComponent_Overlay');
    return (
      <div className={styles.youtube_component_video_overlay}>
        <span className={styles.youtube_component_video_overlay_message}>{overlayText}</span>
      </div>
    );
  };

  renderPlayer = (componentData, settings, theme) => {
    return <YoutubeViewer componentData={componentData} settings={settings} theme={theme} />;
  };

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    const { className, t, componentData, settings } = this.props;
    const containerClassNames = classNames(
      this.styles.youtube_component_video_container,
      className || ''
    );
    return (
      <div data-hook="videoPlayer" className={containerClassNames}>
        {this.renderOverlay(styles, t)}
        {this.renderPlayer(componentData, settings, this.styles)}
      </div>
    );
  }
}

YoutubeComponent.contextType = Context.type;

YoutubeComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  settings: PropTypes.object,
  className: PropTypes.string,
  t: PropTypes.func,
};

export { YoutubeComponent as Component };
