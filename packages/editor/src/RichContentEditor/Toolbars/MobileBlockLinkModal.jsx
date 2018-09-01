import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import MobileLinkModal from './MobileLinkModal';


export default class MobileBlockLinkModal extends Component {
  hidePopup = () => this.props.hidePopup();

  wrapBlockInLink = ({ url, targetBlank, nofollow }) => {
    const { pubsub } = this.props;
    if (!isEmpty(url)) {
      pubsub.set('componentLink', { url, targetBlank, nofollow });
    } else {
      pubsub.set('componentLink', null);
    }
    this.hidePopup();
  };

  deleteLink = () => {
    this.props.pubsub.set('componentLink', null);
  }

  render() {
    const { pubsub, theme, isMobile, anchorTarget, relValue, t, uiSettings } = this.props;
    const componentLink = pubsub.get('componentLink');
    const { url, target, rel } = componentLink || {};
    const targetBlank = target === '_blank';
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
