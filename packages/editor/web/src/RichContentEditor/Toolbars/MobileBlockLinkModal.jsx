import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import MobileLinkModal from './MobileLinkModal';

export default class MobileBlockLinkModal extends Component {
  hidePopup = () => this.props.hidePopup();

  wrapBlockInLink = ({ url, targetBlank, nofollow }) => {
    const { pubsub } = this.props;
    const target = targetBlank ? '_blank' : '_self';
    const rel = nofollow ? 'nofollow' : 'noopener';
    if (!isEmpty(url)) {
      pubsub.setBlockData({ key: 'componentLink', item: { url, target, rel } });
    } else {
      pubsub.setBlockData({ key: 'componentLink', item: null });
    }
    this.hidePopup();
  };

  deleteLink = () => {
    this.props.pubsub.setBlockData({ key: 'componentLink', item: null });
  };

  render() {
    const { pubsub, theme, isMobile, anchorTarget, relValue, t, uiSettings } = this.props;
    const componentLink = pubsub.getBlockData({ key: 'componentLink' });
    const { url, target, rel } = componentLink || {};
    const targetBlank = target === '_blank' || anchorTarget === '_blank';
    const nofollow = rel === 'nofollow';
    return (
      <MobileLinkModal
        url={url}
        targetBlank={targetBlank}
        nofollow={nofollow}
        theme={theme}
        isActive={!!componentLink}
        isMobile={isMobile}
        anchorTarget={anchorTarget}
        relValue={relValue}
        onDone={this.wrapBlockInLink}
        onCancel={this.hidePopup}
        onDelete={this.deleteLink}
        uiSettings={uiSettings}
        t={t}
      />
    );
  }
}

MobileBlockLinkModal.propTypes = {
  pubsub: PropTypes.object.isRequired,
  hidePopup: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  url: PropTypes.string,
  isMobile: PropTypes.bool,
  targetBlank: PropTypes.bool,
  nofollow: PropTypes.bool,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  uiSettings: PropTypes.object,
};
