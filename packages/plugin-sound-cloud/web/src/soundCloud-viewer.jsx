import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  mergeStyles,
  validate,
  ViewportRenderer,
  pluginSoundCloudSchema,
} from 'wix-rich-content-common';
import { isEqual } from 'lodash';
import styles from '../statics/styles/sound-cloud-viewer.scss';

class SoundCloudViewer extends Component {
  constructor(props) {
    super(props);
    validate(props.componentData, pluginSoundCloudSchema);
    this.state = { playing: false, isLoaded: false };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, pluginSoundCloudSchema);
    }
  }

  handleReady = () => {
    if (!this.state.isLoaded) {
      this.setState({ isLoaded: true });
    }
  };

  render() {
    this.styles = mergeStyles({ styles, theme: this.props.theme });
    const { componentData, ...rest } = this.props;
    const { isLoaded } = this.state;
    return (
      <ViewportRenderer theme={this.props.theme}>
        <ReactPlayer
          className={classNames(this.styles.soundCloud_player)}
          url={componentData.src}
          {...rest}
          playing={this.props.disabled ? false : this.state.playing}
          onPlay={() => this.setState({ playing: true })}
          onPause={() => this.setState({ playing: false })}
          onReady={this.handleReady}
          data-loaded={isLoaded}
        />
      </ViewportRenderer>
    );
  }
}

SoundCloudViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  onReady: PropTypes.func,
  onStart: PropTypes.func,
  controls: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  isLoaded: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};

SoundCloudViewer.defaultProps = {
  width: '100%',
  height: '100%',
  controls: true,
};

export default SoundCloudViewer;
