import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FileUploadViewer from './file-upload-viewer';

const DEFAULTS = Object.freeze({
  config: {
    alignment: 'center',
    size: 'fullWidth',
  },
});

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
      const fileNameParts = name.split('.');
      const type = fileNameParts[fileNameParts.length - 1];
      this.updateComponentData({ name, type, size: file.size });
      this.setState({ isLoading: true, error: null });
      onFileSelected(file, this.handleFilesAdded);
    } else {
      this.resetLoadingState({ msg: 'Missing upload function' });
    }
  };

  handleFilesAdded = ({ data, error }) => {
    if (error) {
      this.resetLoadingState(error);
      return;
    }
    this.updateComponentData(data);
    this.resetLoadingState();
  };

  getLoadingParams = componentState => {
    const { isLoading, userSelectedFiles } = componentState;
    return { isLoading: this.state?.isLoading || isLoading, userSelectedFiles };
  };

  resetLoadingState = error => {
    this.setState({ isLoading: false, errorMsg: error?.msg });
    //mark the external state as not loading
    this.props.store.update('componentState', { isLoading: false, userSelectedFiles: null });
  };

  render() {
    const { componentData, theme, setComponentUrl, t, isMobile } = this.props;
    const { errorMsg, isLoading } = this.state;

    return (
      <FileUploadViewer
        componentData={componentData}
        isLoading={isLoading}
        error={errorMsg}
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
  theme: PropTypes.object.isRequired,
  setComponentUrl: PropTypes.func,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
};

FileUploadComponent.defaultProps = {
  settings: {},
};

export { FileUploadComponent as Component, DEFAULTS };
