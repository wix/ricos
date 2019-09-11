import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  mergeStyles,
  validate,
  matchSoundCloudUrl,
  Context,
  ViewportRenderer,
} from 'wix-rich-content-common';
import { isEqual } from 'lodash';
import schema from '../statics/data-schema.json';
import styles from '../statics/styles/sound-cloud-viewer.scss';

class SoundCloudViewer extends Component {
  constructor(props) {
    super(props);
    validate(props.componentData, schema);
    this.state = { playing: false };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, schema);
    }
  }

  render() {
    this.styles = mergeStyles({ styles, theme: this.context.theme });
    const { componentData, ...rest } = this.props;
    return (
      <ViewportRenderer>
        <ReactPlayer
          className={classNames(this.styles.soundCloud_player)}
          url={matchSoundCloudUrl(componentData.src)}
          {...rest}
          playing={this.context.disabled ? false : this.state.playing}
          onPlay={() => this.setState({ playing: true })}
          onPause={() => this.setState({ playing: false })}
        />
      </ViewportRenderer>
    );
  }
}

SoundCloudViewer.contextType = Context.type;

SoundCloudViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  onReady: PropTypes.func,
  onStart: PropTypes.func,
  controls: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
};

SoundCloudViewer.defaultProps = {
  width: '100%',
  height: '100%',
  controls: true,
};

export default SoundCloudViewer;
