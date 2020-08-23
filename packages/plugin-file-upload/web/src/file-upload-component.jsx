import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FileUploadViewer from './file-upload-viewer';

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

  updateComponentData = (data, error) => {
    const { setData } = this.props.blockProps;
    const componentData = { ...this.props.componentData, ...data, error };
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
      this.updateComponentData({ name, type, size: file.size, tempData: true });
      this.setState({ isLoading: true, error: null });
      onFileSelected(file, ({ data, error }) => this.handleFilesAdded({ data, error }));
    } else {
      this.resetLoadingState({ msg: 'Missing upload function' });
    }
  };

  handleFilesAdded = ({ data, error }) => {
    this.updateComponentData({ ...data, tempData: undefined }, error);
    this.resetLoadingState(error);
  };

  getLoadingParams = componentState => {
    const { isLoading, userSelectedFiles } = componentState;
    return { isLoading: this.state?.isLoading || isLoading, userSelectedFiles };
  };

  resetLoadingState = error => {
    this.setState({ isLoading: false, error });
    //mark the external state as not loading
    this.props.store.update('componentState', { isLoading: false, userSelectedFiles: null });
  };

  render() {
    const { componentData, theme, setComponentUrl, t, isMobile } = this.props;
    const { isLoading, error } = this.state;

    return (
      <FileUploadViewer
        componentData={componentData}
        isLoading={isLoading}
        theme={theme}
        setComponentUrl={setComponentUrl}
        t={t}
        error={error}
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
