import React from 'react';
import PropTypes from 'prop-types';
import { DocumentIcon } from './icons';
import { mergeStyles, WixUtils } from 'wix-rich-content-common';

export const ALIGN_CENTER = 'center';
import styles from '../statics/styles/default-upload-file-styles.scss';
import { UPLOAD_FILE_TYPE } from './types';

const DEFAULTS = {
  config: {
    alignment: ALIGN_CENTER,
    size: 'small'
  },
};

class UploadFileComponent extends React.Component {

  static type = { UPLOAD_FILE_TYPE };

  constructor(props) {
    super(props);
    this.state = {};
    this.styles = mergeStyles({ styles, theme: this.props.theme });
  }

  setPlayer = player => {
    this.player = player;
  };

  render() {
    const { componentData } = this.props;
    return (
      <div data-hook="upload-file-component-container" className={styles.upload_file_container}>
        <a href={componentData.fileURL} className={styles.upload_file_link}>
          <div className={styles.upload_file_icon_container}>
            <DocumentIcon className={styles.upload_file_icon} />
            <span className={styles.upload_file_type}>{componentData.fileType}</span>
          </div>
          <span className={styles.upload_file_name}>{componentData.fileName}</span>
        </a>
      </div>
    );
  }
}


UploadFileComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
};

export { UploadFileComponent as Component, DEFAULTS };
