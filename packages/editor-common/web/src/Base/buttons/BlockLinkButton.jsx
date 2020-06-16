import React, { Component } from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from '../../Utils/decorateComponentWithProps';
import EditorModals from '../../Modals/EditorModals';
import { getModalStyles } from '../../Utils/getModalStyles';
import LinkButton from '../../Components/LinkComponents/LinkButton';
import BlockLinkPanel from './BlockLinkPanel';

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
      onOverrideContent,
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
      editorState,
      linkPanelAddons,
    } = this.props;
    const OriginalLinkPanel = !linkPanelAddons || linkPanelAddons.length === 0 || unchangedUrl;
    const modalStyles = getModalStyles({ fullScreen: !OriginalLinkPanel, isMobile });
    const commonProps = {
      pubsub,
      anchorTarget,
      relValue,
      theme,
      t,
      uiSettings,
      unchangedUrl,
      editorState,
      linkPanelAddons,
    };
    if (isMobile) {
      if (helpers && helpers.openModal) {
        const modalProps = {
          componentState,
          helpers,
          modalStyles,
          isMobile,
          modalName: EditorModals.MOBILE_BLOCK_LINK_MODAL,
          hidePopup: helpers.closeModal,
          ...commonProps,
        };
        helpers.openModal(modalProps);
      } else {
        //eslint-disable-next-line no-console
        console.error(
          'Open external helper function is not defined for toolbar button with keyName ' + keyName
        );
      }
    } else {
      const linkPanelProps = {
        onOverrideContent,
        ...commonProps,
      };
      const BlockLinkPanelWithProps = decorateComponentWithProps(BlockLinkPanel, linkPanelProps);
      onOverrideContent(BlockLinkPanelWithProps);
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
  onOverrideContent: PropTypes.func.isRequired,
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
  editorState: PropTypes.object,
  linkPanelAddons: PropTypes.array,
};

export default BlockLinkButton;
