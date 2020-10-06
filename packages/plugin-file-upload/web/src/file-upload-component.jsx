import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FileUploadViewer from './file-upload-viewer';
import { FILE_UPLOAD_TYPE } from './types';
import { getMediaType } from './mediaUtils';
import { onUploadStart, onUploadEnd } from 'wix-rich-content-plugin-commons';

const DEFAULTS = Object.freeze({
  config: {
    alignment: 'center',
    size: 'content',
  },
});

class FileUploadComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
    const { block, store } = this.props;
    this.count = 0;

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

  updateComponentData = data => {
    const { setData } = this.props.blockProps;
    const componentData = { ...this.props.componentData, ...data };
    setData(componentData);
    this.props.store.update('componentData', { ...componentData }, this.props.block.getKey());
  };

  handleFilesSelected = files => {
    const { onFileSelected } = this.props.settings;
    if (onFileSelected && files.length > 0) {
      const file = files[0];
      const name = file.name;
      let type;
      if (name && name.includes('.')) {
        type = name.split('.').pop();
      }
      const size = file.size;
      this.updateComponentData({ name, type, size, tempData: true });
      const uploadingFileBI = onUploadStart(
        FILE_UPLOAD_TYPE,
        this.helpers?.onMediaUploadStart,
        size,
        getMediaType(type)
      );
      this.setState({ isLoading: true });
      onFileSelected(file, ({ data, error }) =>
        this.handleFilesAdded({ data, error, uploadingFileBI })
      );
    } else {
      this.resetLoadingState({ msg: 'missing upload function' });
    }
  };

  handleFilesAdded = ({ data, error, uploadingFileBI }) => {
    onUploadEnd(this.props.helpers?.onMediaUploadEnd, ...uploadingFileBI, data, error);
    this.updateComponentData({ ...data, tempData: undefined, error });
    this.resetLoadingState(error);
  };

  getLoadingParams = componentState => {
    const { isLoading, userSelectedFiles } = componentState;
    return { isLoading: this.state?.isLoading || isLoading, userSelectedFiles };
  };

  resetLoadingState = error => {
    if (error) {
      this.props.commonPubsub.set('onMediaUploadError', error);
    }
    this.setState({ isLoading: false });
    //mark the external state as not loading
    this.props.store.update('componentState', { isLoading: false, userSelectedFiles: null });
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

export { FileUploadComponent as Component, DEFAULTS };
