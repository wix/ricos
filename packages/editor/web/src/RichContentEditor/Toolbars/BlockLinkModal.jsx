import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import MobileLinkModal from './MobileLinkModal';

export default class BlockLinkModal extends Component {
  hidePopup = () => this.props.hidePopup();

  setLinkInBlockData = ({ url, anchor, targetBlank, nofollow }) => {
    const { pubsub, anchorTarget, relValue, unchangedUrl } = this.props;
    let target = '_blank',
      rel = 'nofollow';
    if (!targetBlank) {
      target = anchorTarget !== '_blank' ? anchorTarget : '_self';
    }
    if (!nofollow) {
      rel = relValue !== 'nofollow' ? relValue : 'noopener';
    }
    if (!isEmpty(url) || !isEmpty(anchor) || unchangedUrl) {
      const item = anchor
        ? { anchor }
        : {
            url: url || pubsub.get('componentData')?.config?.link?.url,
            target,
            rel,
          };
      pubsub.setBlockData({
        key: 'componentLink',
        item,
      });
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
      linkTypes,
      editorState,
    } = this.props;
    const componentLink = pubsub.get('componentData')?.config?.link;
    const { url, anchor, target, rel } = componentLink || {};
    const targetBlank = target ? target === '_blank' : anchorTarget === '_blank';
    const nofollow = rel ? rel === 'nofollow' : relValue === 'nofollow';
    return (
      <MobileLinkModal
        url={url}
        anchor={anchor}
        targetBlank={targetBlank}
        nofollow={nofollow}
        theme={theme}
        isActive={!!componentLink}
        isMobile={isMobile}
        anchorTarget={anchorTarget}
        relValue={relValue}
        onDone={this.setLinkInBlockData}
        onCancel={this.hidePopup}
        onDelete={this.deleteLink}
        uiSettings={uiSettings}
        t={t}
        unchangedUrl={unchangedUrl}
        linkTypes={linkTypes}
        editorState={editorState}
      />
    );
  }
}

BlockLinkModal.propTypes = {
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
  linkTypes: PropTypes.object,
  editorState: PropTypes.object,
};
