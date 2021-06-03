import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { LinkModal } from 'wix-rich-content-editor-common';
import { ANCHOR_CATEGORY, WEB_ADDRESS_CATEGORY, isNewTab } from 'wix-rich-content-common';

export default class BlockLinkModal extends Component {
  hidePopup = () => this.props.hidePopup();

  setLinkInBlockData = ({ url, anchor, target, rel }) => {
    const { pubsub, hideUrlInput, triggerBi } = this.props;
    if (!isEmpty(url) || !isEmpty(anchor) || hideUrlInput) {
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

      const biData = anchor
        ? { anchor, category: ANCHOR_CATEGORY }
        : {
            link: item.url,
            rel,
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
      hideUrlInput,
      linkTypes,
      editorState,
    } = this.props;
    const componentLink = pubsub.get('componentData')?.config?.link;
    const { url, anchor, target = anchorTarget, rel } = componentLink || {};
    return (
      <LinkModal
        editorState={editorState}
        url={url}
        anchor={anchor}
        target={target}
        rel={rel}
        theme={theme}
        isActive={!!componentLink}
        isMobile={isMobile}
        anchorTarget={anchorTarget}
        onDone={this.setLinkInBlockData}
        onCancel={this.hidePopup}
        onDelete={this.deleteLink}
        uiSettings={uiSettings}
        t={t}
        linkTypes={linkTypes}
        hideUrlInput={hideUrlInput}
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
  anchorTarget: PropTypes.string,
  t: PropTypes.func,
  uiSettings: PropTypes.object,
  hideUrlInput: PropTypes.bool,
  linkTypes: PropTypes.object,
  editorState: PropTypes.object,
  triggerBi: PropTypes.func,
};
