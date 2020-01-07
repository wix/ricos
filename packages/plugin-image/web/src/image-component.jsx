import React from 'react';
import PropTypes from 'prop-types';
import ImageViewer from './image-viewer';
import { DEFAULTS } from './consts';
import { sizeClassName, alignmentClassName } from './classNameStrategies';
import { Context } from 'wix-rich-content-common';

const EMPTY_SMALL_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

class ImageComponent extends React.Component {
  static alignmentClassName = (componentData, theme, styles, isMobile) =>
    alignmentClassName(componentData, theme, styles, isMobile);

  static sizeClassName = (componentData, theme, styles, isMobile) =>
    sizeClassName(componentData, theme, styles, isMobile);

  constructor(props) {
    super(props);
    this.state = Object.assign({ isMounted: false }, this.stateFromProps(props));

    const { block, store } = this.props;
    if (store) {
      const blockKey = block.getKey();
      store.setBlockHandler('handleFilesSelected', blockKey, this.handleFilesSelected.bind(this));
      store.setBlockHandler('handleFilesAdded', blockKey, this.handleFilesAdded.bind(this));
      store.setBlockHandler('handleMetadataChange', blockKey, this.handleMetadataChange.bind(this));
    }
  }

  componentDidMount() {
    this.state.isMounted = true; //eslint-disable-line react/no-direct-mutation-state
  }

  componentWillUnmount() {
    this.state.isMounted = false; //eslint-disable-line react/no-direct-mutation-state
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    const componentState = props.componentState || {};

    let state = {};
    const { alreadyLoading, isLoading, userSelectedFiles } = this.getLoadingParams(componentState);
    if (!alreadyLoading) {
      if (isLoading !== true && userSelectedFiles) {
        //lets continue the uploading process
        if (userSelectedFiles.files && userSelectedFiles.files.length > 0) {
          state = this.handleFilesSelected(userSelectedFiles.files);
        }
        setTimeout(() => {
          //needs to be async since this function is called during constructor and we do not want the update to call set state on other components
          this.props.store.update('componentState', { isLoading: true, userSelectedFiles: null });
        }, 0);
      }
    }

    return state;
  };

  resetLoadingState = error => {
    //no upload function
    if (this.state.isMounted) {
      this.setState({ isLoading: false, dataUrl: null, error });
    } else {
      //this is async and sometimes called before the component is mounted, so just place it on the state
      //eslint-disable-next-line react/no-direct-mutation-state
      this.state = Object.assign(this.state, {
        isLoading: false,
        dataUrl: null,
        fileError: error,
      });
    }
    //mark the external state as not loading
    this.props.store.update('componentState', { isLoading: false, userSelectedFiles: null });
  };

  fileLoaded = (fileDataUrl, fileList) => {
    if (this.state.isMounted) {
      this.setState({ isLoading: true, dataUrl: fileDataUrl });
    } else {
      //this is async and sometimes called before the component is mounted, so just place it on the state
      //eslint-disable-next-line react/no-direct-mutation-state
      this.state = Object.assign(this.state, {
        isLoading: true,
        dataUrl: fileDataUrl,
        fileError: null,
      });
    }
    const { helpers } = this.context;
    const hasFileChangeHelper = helpers && helpers.onFilesChange;
    if (hasFileChangeHelper && fileList.length > 0) {
      helpers.onFilesChange(fileList[0], ({ data, error }) =>
        this.handleFilesAdded(this.props.block.getKey(), { data, error })
      );
    } else {
      this.resetLoadingState({ msg: 'Missing upload function' });
    }
  };

  handleFilesSelected = files => {
    const state = {};
    const reader = new FileReader();
    reader.onload = e => this.fileLoaded(e.target.result, files);
    reader.readAsDataURL(files[0]);
    Object.assign(state, { isLoading: true, dataUrl: EMPTY_SMALL_PLACEHOLDER });

    return state;
  };

  handleFilesAdded = (blockKey, { data, error }) => {
    const imageData = data.length ? data[0] : data;
    const config = { ...this.props.componentData.config };
    if (!config.alignment) {
      config.alignment = imageData.width >= 740 ? 'center' : 'left';
    }
    const componentData = {
      config,
      src: imageData,
    };
    this.props.store.update('componentData', componentData, blockKey);
    this.resetLoadingState(error);
  };

  handleMetadataChange = newMetadata => {
    const { componentData } = this.props;
    const metadata = { ...componentData.metadata, ...newMetadata };
    this.props.store.update(
      'componentData',
      { ...componentData, metadata },
      this.props.block.getKey()
    );
  };

  getLoadingParams = componentState => {
    //check if the file upload is coming on the regular state
    const alreadyLoading = this.state && this.state.isLoading;
    const { isLoading, userSelectedFiles } = componentState;
    return { alreadyLoading, isLoading, userSelectedFiles };
  };

  handleCaptionChange = caption => this.handleMetadataChange({ caption });

  render() {
    const { settings, componentData, onClick, className, blockProps } = this.props;
    return (
      <ImageViewer
        componentData={componentData}
        onClick={onClick}
        className={className}
        isLoading={this.state.isLoading}
        dataUrl={this.state.dataUrl}
        isFocused={blockProps.isFocused}
        settings={settings}
        defaultCaption={this.context.t('ImageViewer_Caption')}
        onCaptionChange={this.handleCaptionChange}
        setFocusToBlock={blockProps.setFocusToBlock}
      />
    );
  }
}

ImageComponent.contextType = Context.type;

ImageComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  settings: PropTypes.object,
};

export { ImageComponent as Component, DEFAULTS };
