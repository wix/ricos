import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditorModals from '../../Modals/EditorModals';
import { getModalStyles } from '../../Utils/getModalStyles';
import LinkButton from '../../Components/LinkComponents/LinkButton';

//Atomic Blocks Link Button
class BlockLinkButton extends Component {
  get isActive() {
    const componentData = this.props.pubsub.get('componentData');
    return !!componentData?.config?.link;
  }

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
      unchangedUrl,
      innerModal,
      toolbarOffsetTop,
      toolbarOffsetLeft,
    } = this.props;
    const modalStyles = getModalStyles({ fullScreen: false, isMobile });
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
      unchangedUrl,
    };
    if (isMobile) {
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
        ...commonPanelProps,
      };
      innerModal.openInnerModal(modalProps);
    }
  };

  render() {
    const { theme, isMobile, tabIndex, icons, tooltipText } = this.props;
    return (
      <LinkButton
        onClick={this.showLinkPanel}
        isActive={this.isActive}
        theme={theme}
        isMobile={isMobile}
        tooltipText={tooltipText}
        tabIndex={tabIndex}
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
  unchangedUrl: PropTypes.bool,
  tooltipText: PropTypes.string,
  innerModal: PropTypes.object,
  toolbarOffsetTop: PropTypes.string,
  toolbarOffsetLeft: PropTypes.string,
};

export default BlockLinkButton;
