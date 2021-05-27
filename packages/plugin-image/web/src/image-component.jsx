import React from 'react';
import PropTypes from 'prop-types';
import {
  Loader,
  MediaItemErrorMsg,
  uploadFile,
  handleUploadFinished,
} from 'wix-rich-content-plugin-commons';
import ImageViewer from './image-viewer';
import { DEFAULTS } from './consts';
import { sizeClassName, alignmentClassName } from './classNameStrategies';
import { IMAGE_TYPE } from './types';

const EMPTY_SMALL_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

class ImageComponent extends React.Component {
  static alignmentClassName = (componentData, theme, styles, isMobile) =>
    alignmentClassName(componentData, theme, styles, isMobile);

  static sizeClassName = (componentData, theme, styles, isMobile) =>
    sizeClassName(componentData, theme, styles, isMobile);

  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);

    const { block, store } = this.props;
    if (store) {
      const blockKey = block.getKey();
      store.setBlockHandler('handleFilesSelected', blockKey, this.handleFilesSelected.bind(this));
      store.setBlockHandler('handleFilesAdded', blockKey, this.handleFilesAdded.bind(this));
      store.setBlockHandler('handleMetadataChange', blockKey, this.handleMetadataChange.bind(this));
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    const componentState = props.componentState || {};

    let state = {};
    const { isLoading, userSelectedFiles } = this.getLoadingParams(componentState);
    if (!isLoading && userSelectedFiles) {
      //lets continue the uploading process
      if (userSelectedFiles.files && userSelectedFiles.files.length > 0) {
        state = this.handleFilesSelected(userSelectedFiles.files);
      }
      setTimeout(() => {
        //needs to be async since this function is called during constructor and we do not want the update to call set state on other components
        this.props.store.update('componentState', { isLoading: true, userSelectedFiles: null });
      }, 0);
    }

    return state;
  };

  onUploadFinished = ({ componentData, error }) => {
    componentData &&
      this.props.store.update('componentData', componentData, this.props.block.getKey());
    let { dataUrl } = this.state;
    if (!error) {
      dataUrl = null;
    }
    this.setState({ isLoading: false, dataUrl, error });
    this.props.store.update('componentState', { isLoading: false, userSelectedFiles: null });
  };

  onLocalLoad = ({ url: dataUrl }) => this.setState({ isLoading: true, error: false, dataUrl });

  handleFilesSelected = files => {
    const BI = {
      onMediaUploadStart: this.props.helpers.onMediaUploadStart,
      onMediaUploadEnd: this.props.helpers.onMediaUploadEnd,
    };
    uploadFile(
      files,
      this.onLocalLoad,
      this.onUploadFinished,
      this.props.helpers.handleFileUpload,
      BI,
      IMAGE_TYPE,
      this.props.componentData,
      this.props.commonPubsub
    );
    return { isLoading: true, dataUrl: EMPTY_SMALL_PLACEHOLDER };
  };

  handleFilesAdded = ({ data, error }) => {
    handleUploadFinished(
      data,
      error,
      this.onUploadFinished,
      this.props.commonPubsub,
      IMAGE_TYPE,
      this.props.componentData
    );
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
    const { isLoading, userSelectedFiles } = componentState;
    return { isLoading: this.state?.isLoading || isLoading, userSelectedFiles };
  };

  handleCaptionChange = caption => this.handleMetadataChange({ caption });

  renderLoader = () => {
    return <Loader type={'medium'} />;
  };

  render() {
    const {
      settings,
      componentData,
      onClick,
      className,
      blockProps,
      theme,
      isMobile,
      helpers,
      disableRightClick,
      getInPluginEditingMode,
      setInPluginEditingMode,
      setComponentUrl,
      t,
    } = this.props;

    const { error } = componentData;
    return (
      <>
        <ImageViewer
          theme={theme}
          isMobile={isMobile}
          helpers={helpers}
          disableRightClick={disableRightClick}
          getInPluginEditingMode={getInPluginEditingMode}
          setInPluginEditingMode={setInPluginEditingMode}
          componentData={componentData}
          onClick={onClick}
          className={className}
          isLoading={this.state.isLoading}
          dataUrl={this.state.dataUrl}
          settings={settings}
          defaultCaption={this.props.t('ImageViewer_Caption')}
          onCaptionChange={this.handleCaptionChange}
          setFocusToBlock={blockProps.setFocusToBlock}
          setComponentUrl={setComponentUrl}
        />
        {(this.state.isLoading || componentData?.loading) && this.renderLoader()}
        {error && <MediaItemErrorMsg error={error} t={t} />}
      </>
    );
  }
}

ImageComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  settings: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  disableRightClick: PropTypes.bool,
  getInPluginEditingMode: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  isMobile: PropTypes.bool.isRequired,
  setComponentUrl: PropTypes.func,
  commonPubsub: PropTypes.object.isRequired,
};

export { ImageComponent as Component, DEFAULTS };
