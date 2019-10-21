import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { mergeStyles, validate, Context } from 'wix-rich-content-common';
import { DocumentIcon, LoaderIcon } from './icons';
import schema from '../statics/data-schema.json';
import styles from '../statics/styles/file-upload-viewer.scss';

const getNameWithoutType = fileName => {
  if (!fileName || !fileName.includes('.')) {
    return fileName;
  }
  const s = fileName.split('.');
  return s.slice(0, s.length - 1).join('.');
};

class FileUploadViewer extends PureComponent {
  state = {
    resolvedFileUrl: null,
    resolvingUrl: false,
  };

  constructor(props) {
    super(props);
    const { componentData } = props;
    validate(componentData, schema);
    this.iframeRef = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, schema);
    }
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

  renderViewerBody({ type, name }) {
    const showLoader = this.props.isLoading || this.state.resolvingUrl;
    const nameWithoutType = getNameWithoutType(name);
    return (
      <React.Fragment>
        {showLoader ? (
          <LoaderIcon className={this.styles.file_loader_icon} />
        ) : (
          <DocumentIcon className={this.styles.file_upload_icon} />
        )}
        <div className={this.styles.file_upload_name_container}>
          <span className={this.styles.file_upload_name}>{nameWithoutType}</span>
          <span className={this.styles.file_upload_type}>{type}</span>
        </div>
      </React.Fragment>
    );
  }

  renderViewer(fileUrl) {
    const {
      error,
      componentData: { name, type },
    } = this.props;

    if (error) {
      return null;
    }

    return (
      <a href={fileUrl} className={this.styles.file_upload_link}>
        {this.renderViewerBody({ name, type })}
      </a>
    );
  }

  renderFileUrlResolver() {
    const { error, componentData, settings } = this.props;

    if (error) {
      return null;
    }

    const resolveFileUrl = () => {
      if (!settings.resolveFileUrl) {
        return;
      }

      this.setState({ resolvingUrl: true });
      settings.resolveFileUrl(componentData).then(resolveFileUrl => {
        this.setState({ resolveFileUrl });
        this.setState({ resolvingUrl: false });

        if (this.iframeRef.current) {
          this.iframeRef.current.src = resolveFileUrl;
        }
      });
    };

    const resolveIfEnter = ev => {
      const enterEvent = 13;
      if (ev.which === enterEvent) {
        resolveFileUrl();
      }
    };

    return (
      <div
        onClick={resolveFileUrl}
        onKeyDown={resolveIfEnter}
        role="button"
        tabIndex={0}
        className={this.styles.file_upload_link}
      >
        {this.renderViewerBody({ name: componentData.name, type: componentData.type })}
      </div>
    );
  }

  renderAutoDownloadIframe() {
    const withFileUrlResolver = this.props.settings.resolveFileUrl;

    if (!withFileUrlResolver) {
      return null;
    }

    return <iframe ref={this.iframeRef} style={{ display: 'none' }} title="file" />;
  }

  render() {
    const { componentData } = this.props;
    const { theme } = this.context;
    this.styles = this.styles || mergeStyles({ styles, theme });

    const fileUrl = componentData.url || this.state.resolveFileUrl;

    return (
      <div className={this.styles.file_upload_container} data-hook="fileUploadViewer">
        {fileUrl ? this.renderViewer(fileUrl) : this.renderFileUrlResolver()}
        {this.renderError()}
        {this.renderAutoDownloadIframe()}
      </div>
    );
  }
}

FileUploadViewer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  componentData: PropTypes.object.isRequired,
  error: PropTypes.string,
  settings: PropTypes.object,
};

FileUploadViewer.defaultProps = {
  isLoading: false,
  settings: {},
};

FileUploadViewer.contextType = Context.type;

export default FileUploadViewer;
