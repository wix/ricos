import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, validate } from 'wix-rich-content-common';
import isEqual from 'lodash/isEqual';
import schema from '../../statics/data-schema.json';
import styles from '../../statics/styles/unsplash-viewer.scss';

class UnsplashViewer extends Component {
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
    const { componentData } = this.props;
    return (
      <img
        className={this.styles.unsplash_player}
        src={componentData.image.originalUrl}
        alt="unsplash"
      />
    );
  }
}

UnsplashViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  theme: PropTypes.object,
  onReady: PropTypes.func,
  onStart: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
};

UnsplashViewer.defaultProps = {
  width: '100%',
  height: '100%',
};

export default UnsplashViewer;
