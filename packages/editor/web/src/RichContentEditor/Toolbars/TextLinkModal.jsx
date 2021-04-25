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
import MobileLinkModal from './MobileLinkModal';

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

  createLinkEntity = ({ url, anchor, targetBlank, nofollow, defaultName }) => {
    if (!isEmpty(url) || !isEmpty(anchor)) {
      const { getEditorState, setEditorState, anchorTarget, relValue, insertLinkFn } = this.props;
      const editorState = getEditorState();
      if (this.mode === 'TEXT') {
        const newEditorState = insertLinkFn(getEditorState(), {
          url,
          anchor,
          targetBlank,
          nofollow,
          anchorTarget,
          relValue,
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
                    rel: nofollow ? 'nofollow' : relValue,
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
    const {
      getEditorState,
      theme,
      isMobile,
      anchorTarget,
      relValue,
      t,
      uiSettings,
      linkTypes,
    } = this.props;
    const linkData = this.getLinkData(getEditorState());
    const { url, anchor, target, rel } = linkData || {};
    const targetBlank = target ? target === '_blank' : anchorTarget === '_blank';
    const nofollow = rel ? rel === 'nofollow' : relValue === 'nofollow';
    return (
      <MobileLinkModal
        editorState={getEditorState()}
        url={url}
        anchor={anchor}
        targetBlank={targetBlank}
        nofollow={nofollow}
        theme={theme}
        isActive={!isEmpty(linkData)}
        isMobile={isMobile}
        anchorTarget={anchorTarget}
        relValue={relValue}
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
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  uiSettings: PropTypes.object,
  insertLinkFn: PropTypes.func,
  closeInlinePluginToolbar: PropTypes.func,
  linkTypes: PropTypes.object,
};
