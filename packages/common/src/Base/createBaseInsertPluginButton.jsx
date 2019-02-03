import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AtomicBlockUtils, EditorState, SelectionState } from '@wix/draft-js';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import { mergeStyles } from '../Utils/mergeStyles';
import FileInput from '../Components/FileInput';
import ToolbarButton from '../Components/ToolbarButton';
import styles from '../../statics/styles/toolbar-button.scss';

export default ({ blockType, button, helpers, pubsub, t }) => {
  class InsertPluginButton extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      const { buttonStyles } = props.theme || {};
      this.styles = mergeStyles({ styles, theme: buttonStyles });
    }

    addBlock = data => this.createBlock(data, true);

    createBlock = (data, shouldSetEditorState = false) => {
      const { getEditorState, setEditorState, hidePopup } = this.props;
      const contentState = getEditorState().getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        blockType,
        'IMMUTABLE',
        cloneDeep(data)
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = AtomicBlockUtils.insertAtomicBlock(getEditorState(), entityKey, ' ');
      if (hidePopup) {
        hidePopup();
      }
      const recentlyCreatedKey = newEditorState.getSelection().getAnchorKey();
      // when adding atomic block, there is the atomic itself, and then there is a text block with one space,
      // so get the block before the space
      const newBlock = newEditorState.getCurrentContent().getBlockBefore(recentlyCreatedKey);

      const newSelection = new SelectionState({
        anchorKey: newBlock.getKey(),
        anchorOffset: 0,
        focusKey: newBlock.getKey(),
        focusOffset: 0,
      });

      if (shouldSetEditorState) {
        setEditorState(EditorState.forceSelection(newEditorState, newSelection));
      }

      return { newBlock, newSelection, newEditorState };
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
        default:
          this.addBlock(button.componentData || {});
      }
    };

    handleFileChange = event => {
      if (event.target.files.length > 0) {
        const files = Array.from(event.target.files);
        const { newBlock, newSelection, newEditorState } = this.createBlock(button.componentData);
        const state = { userSelectedFiles: { files } };
        pubsub.set('initialState_' + newBlock.getKey(), state);
        this.props.setEditorState(EditorState.forceSelection(newEditorState, newSelection));
      }
    };

    handleExternalFileChanged = data => {
      if (data) {
        this.addBlock(button.componentData || {});
        setTimeout(() => pubsub.getBlockHandler('handleFilesAdded')(data));
      }
    };

    preventBubblingUp = event => event.preventDefault();

    renderButton = () => {
      const { styles } = this;
      const { showName, tabIndex } = this.props;
      const { name, Icon, ButtonElement, wrappingComponent } = button;
      const WrappingComponent = wrappingComponent || 'button';
      if (ButtonElement) {
        return (
          <WrappingComponent
            className={styles.button}
            data-hook={`${name.replace(' ', '_')}_insert_plugin_button`}
            onClick={this.onClick}
          >
            <div className={styles.icon}>
              <ButtonElement key="0" />
            </div>
            {showName && (
              <span key="1" className={styles.label}>
                {name}
              </span>
            )}
          </WrappingComponent>
        );
      } else {
        return (
          <WrappingComponent
            aria-label={`Add ${name}`}
            tabIndex={tabIndex}
            className={styles.button}
            data-hook={`${name.replace(' ', '_')}_insert_plugin_button`}
            onClick={this.onClick}
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
      }
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
        });
      }
    };

    toggleFileSelection = () => {
      const { handleFileSelection } = helpers || {};
      if (handleFileSelection) {
        const multiple = !!button.multi;
        handleFileSelection(
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
      const { styles } = this;
      return (
        <FileInput
          dataHook={`${button.name}_file_input`}
          className={classNames(styles.button, styles.fileUploadButton)}
          onChange={this.handleFileChange}
          accept="image/*"
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
        button.type === 'file' && !(helpers && helpers.handleFileSelection);
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
  };

  return InsertPluginButton;
};
