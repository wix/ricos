import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/preview.scss';

class Preview extends Component {
  static propTypes = {
    transformation: PropTypes.func.isRequired,
    ...RichContentViewer.propTypes,
  };

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { transformation, initialState } = this.props;
    const previewState = transformation.apply(initialState);
    return (
      <div className={styles.preview_container}>
        <RichContentViewer initialState={previewState} {...this.props} />
      </div>
    );
  }
}

export default Preview;
