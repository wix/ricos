import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { mergeStyles, validate, Loader } from 'wix-rich-content-common';
import { DocumentIcon } from './icons';
import schema from '../statics/data-schema.json';
import styles from '../statics/styles/file-upload-viewer.scss';

class FileUploadViewer extends PureComponent {
  constructor(props) {
    super(props);
    const { componentData, theme } = props;
    validate(componentData, schema);
    this.styles = mergeStyles({ styles, theme });
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, schema);
    }
  }

  renderLoader() {
    if (!this.props.isLoading) {
      return null;
    }

    return (
      <div className={this.styles.file_upload_overlay}>
        <Loader theme={this.props.theme} />
      </div>
    );
  }

  renderError() {
    const { error } = this.props;
    if (!error) {
      return null;
    }

    return (
      <div className={this.styles.file_upload_error_container}>
        <span className={this.styles.file_upload_error_text}>{error}</span>
      </div>
    );
  }

  renderViewer() {
    const {
      error,
      componentData: { name, type, url },
    } = this.props;

    if (error) {
      return null;
    }

    return (
      <a href={url} className={this.styles.file_upload_link}>
        <div className={this.styles.file_upload_icon_container}>
          <DocumentIcon className={this.styles.file_upload_icon} />
          <span className={this.styles.file_upload_type}>{type}</span>
        </div>
        <div className={this.styles.file_upload_name_container}>
          <span className={this.styles.file_upload_name}>{name}</span>
        </div>
      </a>
    );
  }

  render() {
    return (
      <div className={this.styles.file_upload_container}>
        {this.renderViewer()}
        {this.renderLoader()}
        {this.renderError()}
      </div>
    );
  }
}

FileUploadViewer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  componentData: PropTypes.object.isRequired,
  error: PropTypes.string,
  theme: PropTypes.object,
};

FileUploadViewer.defaultProps = {
  isLoading: false,
};

export default FileUploadViewer;
