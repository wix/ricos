import React, { Component } from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from '../../Utils/decorateComponentWithProps';
import EditorModals from '../../Modals/EditorModals';
import { getModalStyles } from '../../Utils/getModalStyles';
import LinkButton from '../../Components/LinkButton';
import BlockLinkPanel from './BlockLinkPanel';

class BlockLinkButton extends Component {
  get isActive() {
    return !!this.props.pubsub.getBlockData({ key: 'componentLink' });
  }

  showLinkPanel = () => {
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
    } = this.props;
    const modalStyles = getModalStyles({ fullScreen: false, isMobile });
    if (isMobile) {
      if (helpers && helpers.openModal) {
        const modalProps = {
          componentState,
          helpers,
          pubsub,
          modalStyles,
          isMobile,
          t,
          theme,
          anchorTarget,
          relValue,
          modalName: EditorModals.MOBILE_BLOCK_LINK_MODAL,
          hidePopup: helpers.closeModal,
          uiSettings,
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
        pubsub,
        onOverrideContent,
        anchorTarget,
        relValue,
        theme,
        t,
        uiSettings,
      };
      const BlockLinkPanelWithProps = decorateComponentWithProps(BlockLinkPanel, linkPanelProps);
      onOverrideContent(BlockLinkPanelWithProps);
    }
  };

  render() {
    const { theme, isMobile, t, tabIndex } = this.props;
    const linkButtonTooltip = t('TextLinkButton_Tooltip');
    return (
      <LinkButton
        onClick={this.showLinkPanel}
        isActive={this.isActive}
        theme={theme}
        isMobile={isMobile}
        tooltipText={linkButtonTooltip}
        tabIndex={tabIndex}
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
};

export default BlockLinkButton;
