import React, { Component } from 'react';
import GifPlayer from 'react-gif-player';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles, validate } from 'wix-rich-content-common';
import isEqual from 'lodash/isEqual';
import schema from '../statics/data-schema.json';
import styles from '../statics/styles/giphy-viewer.scss';

class GiphyViewer extends Component {
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
      <GifPlayer
        className={classNames(this.styles.giphy_player)}
        src={componentData.src}
        {...rest}
      />
    );
  }
}

GiphyViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  theme: PropTypes.object,
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
