import React, { Component } from 'react';
import ReactPlayerWrapper from './reactPlayerWrapper';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles, validate, pluginSoundCloudSchema } from 'wix-rich-content-common';
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
    const { componentData, width, height, controls, disabled, setComponentUrl } = this.props;
    setComponentUrl?.(componentData.src);
    const { isLoaded } = this.state;
    const props = { width, height, controls, disabled };
    return (
      <ReactPlayerWrapper
        className={classNames(this.styles.soundCloud_player)}
        url={componentData.src}
        onReady={this.handleReady}
        data-loaded={isLoaded}
        {...props}
      />
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
  disabled: PropTypes.bool,
  setComponentUrl: PropTypes.func,
};

SoundCloudViewer.defaultProps = {
  width: '100%',
  height: '100%',
  controls: true,
};

export default SoundCloudViewer;
