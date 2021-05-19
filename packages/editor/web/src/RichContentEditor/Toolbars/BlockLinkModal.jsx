import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import LinkModal from './LinkModal';
import {
  ANCHOR_CATEGORY,
  WEB_ADDRESS_CATEGORY,
  isNewTab,
  convertRelObjectToString,
  convertRelStringToObject,
} from 'wix-rich-content-common';

export default class BlockLinkModal extends Component {
  hidePopup = () => this.props.hidePopup();

  setLinkInBlockData = ({ url, anchor, targetBlank, rel }) => {
    const { pubsub, anchorTarget, unchangedUrl, triggerBi } = this.props;
    let target = '_blank';
    if (!targetBlank) {
      target = anchorTarget !== '_blank' ? anchorTarget : '_self';
    }
    if (!isEmpty(url) || !isEmpty(anchor) || unchangedUrl) {
      const item = anchor
        ? { anchor }
        : {
            url: url || pubsub.get('componentData')?.config?.link?.url,
            target,
            rel: convertRelObjectToString(rel),
          };
      pubsub.setBlockData({
        key: 'componentLink',
        item,
      });

      const biData = anchor
        ? { anchor, category: ANCHOR_CATEGORY }
        : {
            link: item.url,
            rel: convertRelObjectToString(rel),
            newTab: isNewTab(target),
            category: WEB_ADDRESS_CATEGORY,
          };
      triggerBi({ params: biData });
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
      t,
      uiSettings,
      unchangedUrl,
      linkTypes,
      editorState,
    } = this.props;
    const componentLink = pubsub.get('componentData')?.config?.link;
    const { url, anchor, target, rel } = componentLink || {};
    const targetBlank = target ? target === '_blank' : anchorTarget === '_blank';
    return (
      <LinkModal
        url={url}
        anchor={anchor}
        targetBlank={targetBlank}
        rel={convertRelStringToObject(rel)}
        theme={theme}
        isActive={!!componentLink}
        isMobile={isMobile}
        anchorTarget={anchorTarget}
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
  anchorTarget: PropTypes.string,
  t: PropTypes.func,
  uiSettings: PropTypes.object,
  unchangedUrl: PropTypes.bool,
  linkTypes: PropTypes.object,
  editorState: PropTypes.object,
  triggerBi: PropTypes.func,
};
