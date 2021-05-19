import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit, isEmpty } from 'lodash';
import {
  getLinkDataInSelection,
  removeLinksInSelection,
  setForceSelection,
  isAtomicBlockFocused,
  getBlockInfo,
  getFocusedBlockKey,
  setBlockNewEntityData,
} from 'wix-rich-content-editor-common';
import LinkModal from './LinkModal';
import {
  ANCHOR_CATEGORY,
  WEB_ADDRESS_CATEGORY,
  ADD_PLUGIN_LINK_BI,
  convertRelObjectToString,
  convertRelStringToObject,
} from 'wix-rich-content-common';

export default class TextLinkModal extends Component {
  constructor(props) {
    super(props);
    const editorState = this.props.getEditorState();
    this.mode = this.getMode(editorState);
    if (this.mode === 'IMAGE') {
      const blockKey = getFocusedBlockKey(editorState);
      const { entityData } = getBlockInfo(editorState, blockKey);
      this.imageData = { blockKey, entityData };
    }
  }

  onCancel = () => {
    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    setEditorState(setForceSelection(editorState, editorState.getSelection()));
    this.props.hidePopup();
  };

  createLinkEntity = ({ url, anchor, targetBlank, rel, defaultName }) => {
    if (!isEmpty(url) || !isEmpty(anchor)) {
      const { getEditorState, setEditorState, anchorTarget, insertLinkFn, helpers } = this.props;
      const editorState = getEditorState();
      if (this.mode === 'TEXT') {
        const newEditorState = insertLinkFn(getEditorState(), {
          url,
          anchor,
          targetBlank,
          rel: convertRelObjectToString(rel),
          anchorTarget,
          text: defaultName,
        });
        setEditorState(newEditorState);
      } else if (this.mode === 'IMAGE') {
        const { blockKey, entityData } = this.imageData;
        const data = {
          ...entityData,
          config: {
            ...omit(entityData.config, ['link', 'anchor']),
            ...(anchor
              ? { anchor }
              : {
                  link: {
                    url,
                    target: targetBlank ? '_blank' : anchorTarget,
                    rel: convertRelObjectToString(rel),
                  },
                }),
          },
        };
        const newEditorState = setBlockNewEntityData(
          editorState,
          blockKey,
          data,
          'wix-draft-plugin-image'
        );
        setEditorState(newEditorState);
      }
      const params = anchor
        ? { anchor, category: ANCHOR_CATEGORY }
        : {
            link: url,
            rel: convertRelObjectToString(rel),
            newTab: !!targetBlank,
            category: WEB_ADDRESS_CATEGORY,
          };
      helpers?.onPluginAction?.(ADD_PLUGIN_LINK_BI, { plugin_id: this.mode, params });
    }
    this.props.hidePopup();
  };

  deleteLink = () => {
    const { getEditorState, setEditorState, closeInlinePluginToolbar } = this.props;
    const editorState = getEditorState();
    if (this.mode === 'TEXT') {
      const newEditorState = removeLinksInSelection(editorState, setEditorState);
      setEditorState(newEditorState);
    } else if (this.mode === 'IMAGE') {
      const { blockKey, entityData } = this.imageData;
      const data = omit(entityData, ['config.link', 'config.anchor']);
      const newEditorState = setBlockNewEntityData(
        editorState,
        blockKey,
        data,
        'wix-draft-plugin-image'
      );
      setEditorState(newEditorState);
    }
    closeInlinePluginToolbar();
    this.props.hidePopup();
  };

  getLinkData(editorState) {
    if (this.mode === 'TEXT') {
      return getLinkDataInSelection(editorState);
    }
    if (this.mode === 'IMAGE') {
      return this.imageData.entityData.config.link || {};
    }
    return {};
  }

  getMode(editorState) {
    if (isAtomicBlockFocused(editorState)) {
      const blockKey = getFocusedBlockKey(editorState);
      const { type } = getBlockInfo(editorState, blockKey);
      return type === 'wix-draft-plugin-image' ? 'IMAGE' : 'UNSUPPORTED';
    }
    return 'TEXT';
  }

  render() {
    const { getEditorState, theme, isMobile, anchorTarget, t, uiSettings, linkTypes } = this.props;
    const linkData = this.getLinkData(getEditorState());
    const { url, anchor, target, rel } = linkData || {};
    const targetBlank = target ? target === '_blank' : anchorTarget === '_blank';
    return (
      <LinkModal
        editorState={getEditorState()}
        url={url}
        anchor={anchor}
        targetBlank={targetBlank}
        rel={convertRelStringToObject(rel)}
        theme={theme}
        isActive={!isEmpty(linkData)}
        isMobile={isMobile}
        anchorTarget={anchorTarget}
        onDone={this.createLinkEntity}
        onCancel={this.onCancel}
        onDelete={this.deleteLink}
        uiSettings={uiSettings}
        t={t}
        linkTypes={linkTypes}
      />
    );
  }
}

TextLinkModal.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  hidePopup: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  url: PropTypes.string,
  isMobile: PropTypes.bool,
  targetBlank: PropTypes.bool,
  nofollow: PropTypes.bool,
  sponsored: PropTypes.bool,
  anchorTarget: PropTypes.string,
  t: PropTypes.func,
  uiSettings: PropTypes.object,
  insertLinkFn: PropTypes.func,
  closeInlinePluginToolbar: PropTypes.func,
  linkTypes: PropTypes.object,
  helpers: PropTypes.object,
};
