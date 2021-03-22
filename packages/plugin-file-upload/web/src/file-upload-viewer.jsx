import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { mergeStyles, validate } from 'wix-rich-content-common';
import { LoaderIcon, getIcon, DownloadIcon, ErrorIcon, ReadyIcon } from './icons';
// eslint-disable-next-line max-len
import pluginFileUploadSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-file-upload.schema.json';
import styles from '../statics/styles/file-upload-viewer.scss';
import classnames from 'classnames';

const getNameWithoutType = fileName => {
  if (!fileName || !fileName.includes('.')) {
    return fileName;
  }
  const s = fileName.split('.');
  return s.slice(0, s.length - 1).join('.');
};
const filesWithPreview = ['jpg', 'png', 'pdf', 'jpeg', 'gif', 'doc', 'docx'];
class FileUploadViewer extends PureComponent {
  state = {
    resolvedFileUrl: null,
    resolvingUrl: false,
    currentWidth: 0,
  };

  constructor(props) {
    super(props);
    const { componentData } = props;
    validate(componentData, pluginFileUploadSchema);
    this.iframeRef = React.createRef();
    this.fileUploadViewerRef = React.createRef();
  }

  breakPoints = { firstBreak: 321, secondBreak: 100 };

  updateDimensions = currentWidth => {
    console.log('width', currentWidth, this.breakPoints[currentWidth]);

    if (this.breakPoints.firstBreak >= currentWidth) {
      console.log();
      this.setState({ currentWidth });
    }
  };

  elResizeListener = new ResizeObserver(entries => {
    entries.forEach(entry => {
      const cr = entry.contentRect;
      this.updateDimensions(Math.round(cr.width));
    });
  });

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, pluginFileUploadSchema);
    }
    if (!nextProps.isLoading && this.props.isLoading) {
      this.switchReadyIcon();
    }
  }
  componentDidMount() {
    console.log(this.state.currentWidth > 320);
    this.setState({ currentWidth: this.fileUploadViewerRef.current.offsetWidth });
    this.elResizeListener.observe(this.fileUploadViewerRef.current);
  }

  switchReadyIcon = () => {
    return this.setState({ showReadyIcon: true }, () =>
      setTimeout(() => this.setState({ showReadyIcon: false }), 2000)
    );
  };

  renderContainerWithoutLink = () => {
    const {
      componentData: { name, type },
    } = this.props;
    return (
      <div className={this.styles.file_upload_link}>{this.renderViewerBody({ name, type })}</div>
    );
  };

  renderIcon = Icon => {
    const {
      isLoading,
      isMobile,
      componentData: { error },
    } = this.props;
    const { showReadyIcon, resolvingUrl } = this.state;
    const showLoader = isLoading || resolvingUrl;
    const showFileIcon = (!showLoader && !showReadyIcon && isMobile) || (!isMobile && Icon);
    if (showFileIcon) {
      return null; // todo=>Refactor;
    } else {
      return (
        <div className={isMobile ? this.styles.mobile_status_icon : this.styles.file_upload_state}>
          {error ? (
            <ErrorIcon />
          ) : showLoader ? (
            <LoaderIcon className={this.styles.file_loader_icon} />
          ) : showReadyIcon ? (
            <ReadyIcon />
          ) : (
            <DownloadIcon />
          )}
        </div>
      );
    }
  };

  sizeToString = size => {
    return size < 1000
      ? size + 'B'
      : size < 1000000
      ? Math.round(size / 1000) + 'KB'
      : (size / 1000000).toFixed(2) + 'MB';
  };

  getFileInfoString(type) {
    const {
      componentData: { size, error },
      t,
      isLoading,
    } = this.props;
    const { resolvingUrl } = this.state;
    if (error) {
      return {
        infoString: t('UploadFile_Error_Generic_Item'),
        infoStyle: this.styles.file_upload_text_error,
      };
    }
    const fileType = type?.toUpperCase();
    const translationKey = isLoading || resolvingUrl ? 'UploadFile_Viewer_Loader' : fileType;
    let infoString = t(translationKey, {
      fileType,
    });
    if (size) {
      infoString = infoString + ' • ' + this.sizeToString(size);
    }
    return { infoString, infoStyle: this.styles.file_upload_type };
  }

  renderViewerBody({ name, type, downloadUrl, previewUrl, downloadTarget }) {
    //todo =>Refactor
    // eslint-disable-next-line react/prop-types
    const { isMobile, showLoader, showReadyIcon } = this.props;
    const nameWithoutType = getNameWithoutType(name);
    const Icon = getIcon(type);
    const { infoString, infoStyle } = this.getFileInfoString(type);
    const showFileIcon = (!showLoader && !showReadyIcon && isMobile) || (!isMobile && Icon);

    return (
      <>
        <div className={this.styles.file_upload_text_container}>
          <a
            href={previewUrl ? previewUrl : downloadUrl}
            target={downloadTarget}
            className={this.styles.file_preview_link}
          >
            {showFileIcon && <Icon styles={this.styles} className={this.styles.file_upload_icon} />}
            <div style={{ width: 'calc(100% - 72px)' }}>
              <div className={this.styles.file_upload_name_container}>
                <div className={this.styles.file_upload_name}>{nameWithoutType}</div>
                {type && <div className={this.styles.file_upload_extension}>{'.' + type}</div>}
              </div>
              <div className={infoStyle}>{infoString}</div>
            </div>
          </a>
        </div>
        <div>
          {this.state.currentWidth}
          <a
            href={downloadUrl}
            target={downloadTarget}
            //  className={this.styles.file_download_link}
          >
            {this.renderIcon(Icon)}
            {!isMobile && this.state.currentWidth > 320 && this.renderIcon()}
          </a>
        </div>
      </>
    );
  }

  renderViewer(fileUrl) {
    const {
      componentData: { name, type, error },
    } = this.props;
    const { downloadTarget } = this.props.settings;

    if (error) {
      return this.renderContainerWithoutLink();
    }
    let previewUrl;
    fileUrl =
      // eslint-disable-next-line max-len
      'https://download-files.wixmp.com/ugd/f0f74f_fe8883de601d4b7f98317b719f18720c.docx?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ1cm46YXBwOmU2NjYzMGU3MTRmMDQ5MGFhZWExZjE0OWIzYjY5ZTMyIiwic3ViIjoidXJuOmFwcDplNjY2MzBlNzE0ZjA0OTBhYWVhMWYxNDliM2I2OWUzMiIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sImlhdCI6MTYxNjQwMjQzMiwiZXhwIjoxNjE2NDM4NDQyLCJqdGkiOiJhZTZmNjMyMWJhNzAiLCJvYmoiOltbeyJwYXRoIjoiL3VnZC9mMGY3NGZfZmU4ODgzZGU2MDFkNGI3Zjk4MzE3YjcxOWYxODcyMGMuZG9jeCJ9XV19.L8ir_ttPflA20oOk1VziOKOFerugfzI0XeVeNNdhdpc&filename=%D7%97%D7%95%D7%96%D7%94+%D7%93%D7%99%D7%A8%D7%94+%D7%91%D7%99%D7%AA+%D7%90%D7%9C+8+%D7%AA%D7%90+2021-+3+%D7%A9%D7%95%D7%AA%D7%A4%D7%99%D7%9D.docx';
    const downloadUrl = fileUrl;
    if (filesWithPreview.includes(type)) {
      const previewIndexLimit = downloadUrl.indexOf('&filename');
      previewUrl = previewIndexLimit !== -1 ? downloadUrl.slice(0, previewIndexLimit) : downloadUrl;
    }
    return (
      // <a href={fileUrl} target={downloadTarget} className={this.styles.file_upload_link}>
      this.renderViewerBody({ name, type, downloadUrl, previewUrl, downloadTarget })
      // </a>
    );
  }

  renderFileUrlResolver() {
    const {
      componentData,
      settings: { resolveFileUrl },
    } = this.props;
    const { name, type, error } = componentData;

    if (error) {
      return this.renderContainerWithoutLink();
    }

    const fileUrlResolver = () => {
      this.setState({ resolvingUrl: true });
      resolveFileUrl(componentData).then(resolvedFileUrl => {
        this.setState({ resolvedFileUrl, resolvingUrl: false }, this.switchReadyIcon);

        if (this.iframeRef.current) {
          this.iframeRef.current.src = resolvedFileUrl;
        }
      });
    };

    const resolveIfEnter = ev => {
      const enterEvent = 13;
      if (ev.which === enterEvent) {
        fileUrlResolver();
      }
    };

    return (
      <div
        onClick={fileUrlResolver}
        onKeyDown={resolveIfEnter}
        role="button"
        tabIndex={0}
        className={this.styles.file_upload_link}
      >
        {this.renderViewerBody({ name, type })}
      </div>
    );
  }

  renderAutoDownloadIframe() {
    const withFileUrlResolver = this.props.settings.resolveFileUrl;
    if (!withFileUrlResolver) {
      return null;
    }

    // return <iframe ref={this.iframeRef} style={{ display: 'none' }} title="file" />;
  }

  render() {
    const { componentData, theme, setComponentUrl } = this.props;
    this.styles = this.styles || mergeStyles({ styles, theme });
    const fileUrl = componentData.url || this.state.resolvedFileUrl;
    setComponentUrl?.(fileUrl);
    const viewer = fileUrl ? this.renderViewer(fileUrl) : this.renderFileUrlResolver();
    const style = classnames(
      this.styles.file_upload_container,
      componentData.error && this.styles.file_upload_error_container
    );
    return (
      <div
        className={style}
        ref={this.fileUploadViewerRef}
        data-hook="fileUploadViewer"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {viewer}
        {this.renderAutoDownloadIframe()}
      </div>
    );
  }
}

FileUploadViewer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  componentData: PropTypes.object.isRequired,
  settings: PropTypes.object,
  theme: PropTypes.object.isRequired,
  setComponentUrl: PropTypes.func,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
};

FileUploadViewer.defaultProps = {
  isLoading: false,
  settings: {},
};

export default FileUploadViewer;
