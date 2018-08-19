import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles, validate } from 'wix-rich-content-common';
import isEqual from 'lodash/isEqual';
import schema from '../statics/data-schema.json';
import styles from '../statics/styles/soundcloud-viewer.scss';

class SoundcloudV extends Component {
  constructor(props) {
    super(props);
    validate(props.componentData, schema);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, schema);
    }
  }

  render() {
    const { componentData, theme, ...rest } = this.props; // eslint-disable-line no-unused-vars
    return (
      <ReactPlayer
        className={classNames(this.styles.soundcloud_player)}
        url={componentData.src}
        {...rest}
      />
    );
  }
}

SoundcloudV.propTypes = {
  componentData: PropTypes.object.isRequired,
  theme: PropTypes.object,
  onReady: PropTypes.func,
  onStart: PropTypes.func,
  controls: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
};

SoundcloudV.defaultProps = {
  width: '100%',
  height: '100%',
  controls: true,
};

export default SoundcloudV;
