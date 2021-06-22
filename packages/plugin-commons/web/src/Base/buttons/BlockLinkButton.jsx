import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorModals, getModalStyles, LinkButton } from 'wix-rich-content-editor-common';
import { ADD_PLUGIN_LINK_BI } from 'wix-rich-content-common';
import { isEmpty } from 'lodash';

//Atomic Blocks Link Button
class BlockLinkButton extends Component {
  get isActive() {
    const componentData = this.props.pubsub.get('componentData');
    return !!componentData?.config?.link;
  }

  triggerBi = biParams =>
    this.props.helpers?.onPluginAction?.(ADD_PLUGIN_LINK_BI, {
      plugin_id: this.props.pluginType,
      ...biParams,
    });

  showLinkPanel = () => {
    document.activeElement.blur();
    const {
      pubsub,
      theme,
      isMobile,
      helpers,
      keyName,
      componentState,
      anchorTarget,
      relValue,
      t,
      uiSettings,
      hideUrlInput,
      innerModal,
      toolbarOffsetTop,
      toolbarOffsetLeft,
      linkTypes,
      editorState,
    } = this.props;
    const OriginalLinkPanel =
      !linkTypes ||
      isEmpty(linkTypes) ||
      !Object.values(linkTypes).find(addon => !!addon) ||
      hideUrlInput;
    const { externalPopups = false } = uiSettings.linkPanel;
    const customStyles =
      !isMobile && !OriginalLinkPanel
        ? {
            content: {
              width: 512,
              maxWidth: 512,
              height: 390,
              border: '1px solid rgb(237, 237, 237)',
              borderRadius: '6px',
              boxShadow: 'rgba(0, 0, 0, 0.07) 0px 4px 8px 0px',
              padding: '0px 19px',
            },
          }
        : {
            content: {
              position: 'fixed',
            },
          };
    const modalStyles = getModalStyles({ fullScreen: isMobile, isMobile, customStyles });
    const commonPanelProps = {
      componentState,
      helpers,
      pubsub,
      t,
      theme,
      anchorTarget,
      relValue,
      modalName: EditorModals.BLOCK_LINK_MODAL,
      uiSettings,
      hideUrlInput,
      linkTypes,
      editorState,
      triggerBi: this.triggerBi,
    };
    if (isMobile || externalPopups) {
      if (helpers && helpers.openModal) {
        const modalProps = {
          modalStyles,
          hidePopup: helpers.closeModal,
          isMobile,
          ...commonPanelProps,
        };
        helpers.openModal(modalProps);
      } else {
        //eslint-disable-next-line no-console
        console.error(
          'Open external helper function is not defined for toolbar button with keyName ' + keyName
        );
      }
    } else {
      const modalProps = {
        hidePopup: innerModal.closeInnerModal,
        top: toolbarOffsetTop,
        left: toolbarOffsetLeft,
        modalStyles: OriginalLinkPanel ? null : { maxWidth: 'none', padding: '0 19px' },
        ...commonPanelProps,
      };
      innerModal.openInnerModal(modalProps);
    }
  };

  render() {
    const { theme, isMobile, tabIndex, icons, tooltipText, helpers, pluginType } = this.props;
    return (
      <LinkButton
        onClick={this.showLinkPanel}
        helpers={helpers}
        isActive={this.isActive}
        theme={theme}
        isMobile={isMobile}
        tooltipText={tooltipText}
        tabIndex={tabIndex}
        pluginType={pluginType}
        icon={icons}
      />
    );
  }
}

BlockLinkButton.propTypes = {
  pubsub: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  helpers: PropTypes.object,
  keyName: PropTypes.string,
  componentState: PropTypes.object,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
  uiSettings: PropTypes.object,
  icons: PropTypes.object,
  hideUrlInput: PropTypes.bool,
  tooltipText: PropTypes.string,
  innerModal: PropTypes.object,
  toolbarOffsetTop: PropTypes.string,
  toolbarOffsetLeft: PropTypes.string,
  linkTypes: PropTypes.object,
  editorState: PropTypes.object,
  pluginType: PropTypes.string,
};

export default BlockLinkButton;
