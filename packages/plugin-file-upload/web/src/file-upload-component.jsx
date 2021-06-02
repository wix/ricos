import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FileUploadViewer from './file-upload-viewer';
import { FILE_UPLOAD_TYPE } from './types';
import { uploadFile, handleUploadFinished } from 'wix-rich-content-plugin-commons';

class FileUploadComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
    const { block, store } = this.props;

    if (store) {
      const blockKey = block.getKey();
      store.setBlockHandler('handleFilesSelected', blockKey, this.handleFilesSelected);
      store.setBlockHandler('handleFilesAdded', blockKey, this.handleFilesAdded);
    }
  }

  componentDidMount() {
    this.setState(this.stateFromProps(this.props));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    let state = {};
    const componentState = props.componentState || {};
    const { isLoading, userSelectedFiles } = this.getLoadingParams(componentState);
    if (!isLoading && userSelectedFiles) {
      if (userSelectedFiles.files && userSelectedFiles.files.length > 0) {
        state = this.handleFilesSelected(userSelectedFiles.files);
      }
      setTimeout(
        () =>
          this.props.store.update('componentState', { isLoading: true, userSelectedFiles: null }),
        0
      );
    }
    return state;
  };

  onLocalLoad = componentData => {
    this.updateComponentData(componentData);
    this.setState({ isLoading: true });
  };

  updateComponentData = data => {
    const { setData } = this.props.blockProps;
    const componentData = { ...this.props.componentData, ...data };
    setData(componentData);
    this.props.store.update('componentData', { ...componentData }, this.props.block.getKey());
  };

  onUploadFinished = ({ data }) => {
    this.updateComponentData(data);
    this.setState({ isLoading: false });
    //mark the external state as not loading
    this.props.store.update('componentState', { isLoading: false, userSelectedFiles: null });
  };

  handleFilesSelected = files => {
    const BI = {
      onMediaUploadStart: this.props.helpers.onMediaUploadStart,
      onMediaUploadEnd: this.props.helpers.onMediaUploadEnd,
    };
    uploadFile(
      files,
      this.onLocalLoad,
      this.onUploadFinished,
      this.props.settings.onFileSelected,
      BI,
      FILE_UPLOAD_TYPE,
      this.props.componentData,
      this.props.commonPubsub
    );
  };

  handleFilesAdded = ({ data, error }) => {
    handleUploadFinished(
      data,
      error,
      this.onUploadFinished,
      this.props.commonPubsub,
      FILE_UPLOAD_TYPE,
      this.props.componentData
    );
  };

  getLoadingParams = componentState => {
    const { isLoading, userSelectedFiles } = componentState;
    return { isLoading: this.state?.isLoading || isLoading, userSelectedFiles };
  };

  render() {
    const { componentData, theme, setComponentUrl, t, isMobile } = this.props;
    const { isLoading } = this.state;

    return (
      <FileUploadViewer
        componentData={componentData}
        isLoading={isLoading}
        theme={theme}
        setComponentUrl={setComponentUrl}
        t={t}
        isMobile={isMobile}
      />
    );
  }
}

FileUploadComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  commonPubsub: PropTypes.object,
  theme: PropTypes.object.isRequired,
  setComponentUrl: PropTypes.func,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  helpers: PropTypes.object,
};

FileUploadComponent.defaultProps = {
  settings: {},
};

export { FileUploadComponent as Component };
