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
    }

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
      this.props.hidePopup?.();
      return createBlock(editorState, data, type);
    };

    createBlocksFromFiles = (files, data, type) => {
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
        const state = { userSelectedFiles: { files: Array.isArray(file) ? file : [file] } };
        commonPubsub.set('initialState_' + newBlock.getKey(), state);
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
          this.addCustomBlock(button);
          break;
        default:
          this.addBlock(button.componentData || {});
      }
    };

    handleFileChange = files => {
      if (files.length > 0) {
        const galleryType = 'wix-draft-plugin-gallery';
        const galleryData = pluginDefaults[galleryType];
        const shouldCreateGallery =
          blockType === galleryType ||
          (galleryData && settings.createGalleryForMultipleImages && files.length > 1);

        const { newEditorState, newSelection } = shouldCreateGallery
          ? this.createBlocksFromFiles([files], galleryData, galleryType)
          : this.createBlocksFromFiles(files, button.componentData, blockType);

        this.props.setEditorState(EditorState.forceSelection(newEditorState, newSelection));
      }
    };

    handleExternalFileChanged = (data, error) => {
      if (data) {
        if (error) {
          data.error = error;
        }

        const { newBlock } = this.addBlock(button.componentData || {});
        const blockKey = newBlock.getKey();
        setTimeout(() => pubsub.getBlockHandler('handleFilesAdded', blockKey)(data));
      }
    };

    preventBubblingUp = event => event.preventDefault();

    renderButton = () => {
      const { styles } = this;
      const { showName, tabIndex, setEditorState } = this.props;
      const { name, Icon, wrappingComponent } = button;
      const WrappingComponent = wrappingComponent || 'button';

      return (
        <WrappingComponent
          aria-label={`Add ${name}`}
          tabIndex={tabIndex}
          className={styles.button}
          data-hook={`${name.replace(' ', '_')}_insert_plugin_button`}
          onClick={this.onClick}
          ref={this.buttonRef}
          pubsub={pubsub}
          setEditorState={setEditorState}
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
      if (settings && settings.handleFileSelection) {
        settings.handleFileSelection(this.handleExternalFileChanged);
      } else if (helpers && helpers.handleFileSelection) {
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
      const shouldHandleFileSelection =
        (settings && settings.handleFileSelection) || (helpers && helpers.handleFileSelection);

      return (
        <FileInput
          dataHook={`${button.name}_file_input`}
          className={classNames(styles.button, styles.fileUploadButton)}
          onChange={this.handleFileChange}
          onClick={shouldHandleFileSelection ? this.onClick : undefined}
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
      const buttonWrapperClassNames = classNames(styles.buttonWrapper, {
        [styles.mobile]: isMobile,
      });

      const Button = (
        <div className={buttonWrapperClassNames}>
          {button.type === 'file' ? this.renderFileUploadButton() : this.renderButton()}
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
  };

  return InsertPluginButton;
};
