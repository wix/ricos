import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, validate } from 'wix-rich-content-common';
import isEqual from 'lodash/isEqual';
import schema from '../statics/data-schema.json';
import styles from '../statics/styles/upload-file-viewer.scss';
import { DocumentIcon } from './icons';

class UploadFileViewer extends Component {
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
      <a href={componentData.fileURL} className={this.styles.upload_file_link}>
        <div className={styles.upload_file_icon_container}>
          <DocumentIcon className={styles.upload_file_icon} />
          <span className={styles.upload_file_type}>{componentData.fileType}</span>
        </div>
        <span className={styles.upload_file_name}>{componentData.fileName}</span>
      </a>
    );
  }
}

UploadFileViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  theme: PropTypes.object,
  onReady: PropTypes.func,
  onStart: PropTypes.func,
  controls: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
};

UploadFileViewer.defaultProps = {
  width: '100%',
  height: '100%',
  controls: true,
};

export default UploadFileViewer;
