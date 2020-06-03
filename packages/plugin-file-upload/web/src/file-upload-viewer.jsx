import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { mergeStyles, validate, pluginFileUploadSchema } from 'wix-rich-content-common';
import { LoaderIcon, getIcon, DownloadIcon, ErrorIcon, ReadyIcon } from './icons';
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
    showReadyIcon: true,
  };

  constructor(props) {
    super(props);
    const { componentData } = props;
    validate(componentData, pluginFileUploadSchema);
    this.iframeRef = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, pluginFileUploadSchema);
    }
    if (nextProps.isLoading && !this.props.isLoading) {
      setTimeout(() => this.setState({ showReadyIcon: false }), 2000);
    }
  }

  getCurrentTime = () => {
    return Math.floor(Date.now() / 1000);
  };

  renderError = () => {
    const { componentData } = this.props;
    return (
      <div className={this.styles.file_upload_link}>
        {this.renderViewerBody({ name: componentData.name, type: componentData.type })}
      </div>
    );
  };

  renderStatusIcon = () => {
    const { error, isLoading } = this.props;
    const { showReadyIcon, resolvingUrl } = this.state;
    const showLoader = isLoading || resolvingUrl;
    return (
      <div className={this.styles.file_upload_state}>
        {showLoader ? (
          <LoaderIcon className={this.styles.file_loader_icon} />
        ) : error ? (
          <ErrorIcon />
        ) : showReadyIcon ? (
          <ReadyIcon className={this.styles.ready_icon} />
        ) : (
          <DownloadIcon />
        )}
      </div>
    );
  };

  renderViewerBody({ type, name }) {
    const nameWithoutType = getNameWithoutType(name);
    const Icon = getIcon(type);
    return (
      <React.Fragment>
        <Icon className={this.styles.file_upload_icon} />
        <div className={this.styles.file_upload_text_container}>
          <div className={this.styles.file_upload_name_container}>
            <span className={this.styles.file_upload_name}>{nameWithoutType}</span>
            <span className={this.styles.file_upload_name}>{'.' + type}</span>
          </div>
          <span className={this.styles.file_upload_type}>{type}</span>
        </div>
        {this.renderStatusIcon()}
      </React.Fragment>
    );
  }

  renderViewer(fileUrl) {
    const {
      error,
      componentData: { name, type },
    } = this.props;
    const { downloadTarget } = this.props.settings;

    if (error) {
      return this.renderError();
    }

    return (
      <a href={fileUrl} target={downloadTarget} className={this.styles.file_upload_link}>
        {this.renderViewerBody({ name, type })}
      </a>
    );
  }

  renderFileUrlResolver() {
    const { error, componentData, settings } = this.props;

    if (error) {
      return this.renderError();
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
    const { componentData, theme, setComponentUrl, error } = this.props;
    this.styles = this.styles || mergeStyles({ styles, theme });

    const fileUrl = componentData.url || this.state.resolveFileUrl;
    setComponentUrl?.(fileUrl);
    const viewer = fileUrl ? this.renderViewer(fileUrl) : this.renderFileUrlResolver();
    const borderStyle = error ? { border: '1px solid #F64D43' } : { border: '1px solid #ededed' };
    return componentData.type || error ? (
      <div
        className={this.styles.file_upload_container}
        style={borderStyle}
        data-hook="fileUploadViewer"
      >
        {viewer}
        {this.renderAutoDownloadIframe()}
      </div>
    ) : null;
  }
}

FileUploadViewer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  componentData: PropTypes.object.isRequired,
  error: PropTypes.string,
  settings: PropTypes.object,
  theme: PropTypes.object.isRequired,
  setComponentUrl: PropTypes.func,
};

FileUploadViewer.defaultProps = {
  isLoading: false,
  settings: {},
};

export default FileUploadViewer;
