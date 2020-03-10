import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { isEmpty } from 'lodash';
import { mergeStyles } from 'wix-rich-content-common';
import { createBlock } from '../Utils/draftUtils.js';
import classNames from 'classnames';
import FileInput from '../Components/FileInput';
import ToolbarButton from '../Components/ToolbarButton';
import styles from '../../statics/styles/toolbar-button.scss';

const galleryType = 'wix-draft-plugin-gallery';

/**
 * createBaseInsertPluginButton
 */
export default ({
  blockType,
  button,
  helpers,
  pubsub,
  commonPubsub,
  settings,
  t,
  initialIntent,
  isMobile,
  pluginDefaults,
}) => {
  class InsertPluginButton extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {};
      const { buttonStyles } = props.theme || {};
      this.styles = mergeStyles({ styles, theme: buttonStyles });
      this.buttonRef = React.createRef();
      this.toolbarName = props.toolbarName;
    }

    onPluginAdd = name => helpers?.onPluginAdd?.(blockType, name || this.toolbarName);

    componentDidMount() {
      this.initialIntent();
    }

    initialIntent = () => {
      if (initialIntent === blockType) {
        const { buttonRef } = this;
        buttonRef && buttonRef.current && buttonRef.current.click();
      }
    };

    addBlock = data => {
      const { getEditorState, setEditorState } = this.props;
      const { newBlock, newSelection, newEditorState } = this.createBlock(
        getEditorState(),
        data,
        blockType
      );
      setEditorState(EditorState.forceSelection(newEditorState, newSelection));
      return { newBlock, newSelection, newEditorState };
    };

    addCustomBlock = buttonData => {
      const { getEditorState } = this.props;
      buttonData.addBlockHandler?.(getEditorState());
    };

    createBlock = (editorState, data, type) => {
      this.onPluginAdd();
      this.props.hidePopup?.();
      return createBlock(editorState, data, type);
    };

    createBlocksFromFiles = (files, data, type, updateEntity) => {
      let editorState = this.props.getEditorState();
      let selection;
      files.forEach(file => {
        const { newBlock, newSelection, newEditorState } = this.createBlock(
          editorState,
          data,
          type
        );
        editorState = newEditorState;
        selection = selection || newSelection;
        updateEntity(newBlock.getKey(), file);
      });

      return { newEditorState: editorState, newSelection: selection };
    };

    onClick = event => {
      event.preventDefault();
      switch (button.type) {
        case 'file':
          this.toggleFileSelection();
          break;
        case 'modal':
          this.toggleButtonModal(event);
          break;
        case 'custom-block':
          this.onPluginAdd(name);
          this.addCustomBlock(button);
          break;
        default:
          this.addBlock(button.componentData || {});
          break;
      }
    };

    shouldCreateGallery = files =>
      blockType === galleryType ||
      (pluginDefaults[galleryType] && settings.createGalleryForMultipleImages && files.length > 1);

    handleFileChange = (files, updateEntity) => {
      if (files.length > 0) {
        const galleryData = pluginDefaults[galleryType];
        const { newEditorState, newSelection } = this.shouldCreateGallery(files)
          ? this.createBlocksFromFiles([files], galleryData, galleryType, updateEntity)
          : this.createBlocksFromFiles(files, button.componentData, blockType, updateEntity);

        this.props.setEditorState(EditorState.forceSelection(newEditorState, newSelection));
      }
    };

    handleNativeFileChange = files =>
      this.handleFileChange(files, (blockKey, file) => {
        const state = { userSelectedFiles: { files: Array.isArray(file) ? file : [file] } };
        commonPubsub.set('initialState_' + blockKey, state);
      });

    handleExternalFileChanged = (data, error) => {
      if (data) {
        const handleFilesAdded = this.shouldCreateGallery(data.data)
          ? blockKey => commonPubsub.getBlockHandler('galleryHandleFilesAdded', blockKey)
          : blockKey => pubsub.getBlockHandler('handleFilesAdded', blockKey);
        this.handleFileChange(data.data, (blockKey, file) =>
          setTimeout(() => handleFilesAdded(blockKey)({ data: file, error }))
        );
      }
    };

    preventBubblingUp = event => event.preventDefault();

    renderButton = () => {
      const { styles } = this;
      const { showName, tabIndex, setEditorState } = this.props;
      const { name, Icon, wrappingComponent } = button;

      const WrappingComponent = wrappingComponent || 'button';

      let buttonCompProps = {};
      if (wrappingComponent) {
        buttonCompProps = {
          setEditorState,
          pubsub,
        };
      }

      return (
        <WrappingComponent
          aria-label={`Add ${name}`}
          tabIndex={tabIndex}
          className={classNames(styles.button, button.type === 'file' && styles.fileUploadButton)}
          data-hook={`${name.replace(' ', '_')}_insert_plugin_button`}
          onClick={this.onClick}
          ref={this.buttonRef}
          {...buttonCompProps}
        >
          <div className={styles.icon}>
            <Icon key="0" />
          </div>
          {showName && (
            <span key="1" className={styles.label}>
              {name}
            </span>
          )}
        </WrappingComponent>
      );
    };

    toggleButtonModal = event => {
      if (helpers && helpers.openModal) {
        let modalStyles = {};
        if (button.modalStyles) {
          modalStyles = button.modalStyles;
        } else if (button.modalStylesFn) {
          modalStyles = button.modalStylesFn({ buttonRef: event.target, pubsub });
        }

        helpers.openModal({
          modalName: button.modalName,
          modalElement: button.modalElement,
          modalDecorations: button.modalDecorations,
          buttonRef: event.target,
          modalStyles,
          theme: this.props.theme,
          componentData: button.componentData,
          onConfirm: this.addBlock,
          pubsub,
          helpers,
          t,
          isMobile,
        });
      }
    };

    toggleFileSelection = () => {
      if (settings?.handleFileSelection) {
        settings.handleFileSelection(this.handleExternalFileChanged);
      } else if (helpers?.handleFileSelection) {
        const multiple = !!button.multi;
        helpers.handleFileSelection(
          undefined,
          multiple,
          this.handleExternalFileChanged,
          undefined,
          button.componentData
        );
      }
    };

    renderFileUploadButton = () => {
      const { showName, tabIndex } = this.props;
      const { name, Icon } = button;
      const { accept } = settings || {};
      const { styles } = this;

      return (
        <FileInput
          dataHook={`${button.name}_file_input`}
          className={classNames(styles.button, styles.fileUploadButton)}
          onChange={this.handleNativeFileChange}
          accept={accept}
          multiple={button.multi}
          theme={this.props.theme}
          tabIndex={tabIndex}
        >
          <div className={styles.icon}>
            <Icon key="0" />
          </div>
          {showName && (
            <span key="1" className={styles.label}>
              {name}
            </span>
          )}
        </FileInput>
      );
    };

    render() {
      const { styles } = this;
      const { theme, isMobile } = this.props;
      const { tooltipText } = button;
      const showTooltip = !isMobile && !isEmpty(tooltipText);
      const shouldRenderFileUploadButton =
        button.type === 'file' &&
        !((settings && settings.handleFileSelection) || (helpers && helpers.handleFileSelection));
      const buttonWrapperClassNames = classNames(styles.buttonWrapper, {
        [styles.mobile]: isMobile,
      });

      const Button = (
        <div className={buttonWrapperClassNames}>
          {shouldRenderFileUploadButton ? this.renderFileUploadButton() : this.renderButton()}
        </div>
      );

      return (
        <ToolbarButton
          theme={theme}
          showTooltip={showTooltip}
          tooltipText={tooltipText}
          button={Button}
          tooltipOffset={{ y: -10 }}
        />
      );
    }
  }

  InsertPluginButton.propTypes = {
    getEditorState: PropTypes.func.isRequired,
    setEditorState: PropTypes.func.isRequired,
    theme: PropTypes.object,
    hidePopup: PropTypes.func,
    showName: PropTypes.bool,
    isMobile: PropTypes.bool,
    t: PropTypes.func,
    tabIndex: PropTypes.number,
    toolbarName: PropTypes.string,
  };

  return InsertPluginButton;
};
