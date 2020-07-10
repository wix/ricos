import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import MobileLinkModal from './MobileLinkModal';

export default class MobileBlockLinkModal extends Component {
  hidePopup = () => this.props.hidePopup();

  wrapBlockInLink = ({ url, targetBlank, nofollow }) => {
    const { pubsub, anchorTarget, relValue } = this.props;
    let target = '_blank',
      rel = 'nofollow';
    if (!targetBlank) {
      target = anchorTarget !== '_blank' ? anchorTarget : '_self';
    }
    if (!nofollow) {
      rel = relValue !== 'nofollow' ? relValue : 'noopener';
    }
    if (!isEmpty(url)) {
      pubsub.setBlockData({ key: 'componentLink', item: { url, target, rel } });
    } else {
      pubsub.setBlockData({ key: 'componentLink', item: null });
    }
    this.hidePopup();
  };

  deleteLink = () => {
    this.props.pubsub.setBlockData({ key: 'componentLink', item: null });
    this.hidePopup();
  };

  render() {
    const {
      pubsub,
      theme,
      isMobile,
      anchorTarget,
      relValue,
      t,
      uiSettings,
      unchangedUrl,
    } = this.props;
    const componentLink = pubsub.get('componentData')?.config?.link;
    const { url, target, rel } = componentLink || {};
    const targetBlank = target ? target === '_blank' : anchorTarget === '_blank';
    const nofollow = rel ? rel === 'nofollow' : relValue === 'nofollow';
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
        unchangedUrl={unchangedUrl}
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
  unchangedUrl: PropTypes.bool,
};
