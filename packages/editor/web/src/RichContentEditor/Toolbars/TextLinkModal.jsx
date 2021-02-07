import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import {
  getLinkDataInSelection,
  removeLinksInSelection,
  setForceSelection,
} from 'wix-rich-content-editor-common';
import LinkModal from './LinkModal';

export default class TextLinkModal extends Component {
  hidePopup = () => {
    const { hidePopup } = this.props;
    hidePopup();
  };

  onCancel = () => {
    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    setEditorState(setForceSelection(editorState, editorState.getSelection()));
    this.hidePopup();
  };

  createLinkEntity = ({ url, anchor, targetBlank, nofollow, defaultName, sponsored }) => {
    if (!isEmpty(url) || !isEmpty(anchor)) {
      const { getEditorState, setEditorState, anchorTarget, relValue, insertLinkFn } = this.props;
      const newEditorState = insertLinkFn(getEditorState(), {
        url,
        anchor,
        targetBlank,
        nofollow,
        anchorTarget,
        relValue,
        sponsored,
        text: defaultName,
      });
      setEditorState(newEditorState);
    }
    this.hidePopup();
  };

  deleteLink = () => {
    const { getEditorState, setEditorState, closeInlinePluginToolbar } = this.props;
    const editorState = getEditorState();
    const newEditorState = removeLinksInSelection(editorState, setEditorState);
    setEditorState(newEditorState);
    closeInlinePluginToolbar();
    this.hidePopup();
  };

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
    const linkData = getLinkDataInSelection(getEditorState());
    const { url, anchor, target, rel, sponsored } = linkData || {};
    const targetBlank = target ? target === '_blank' : anchorTarget === '_blank';
    const nofollow = rel ? rel === 'nofollow' : relValue === 'nofollow';
    return (
      <LinkModal
        editorState={getEditorState()}
        url={url}
        anchor={anchor}
        targetBlank={targetBlank}
        nofollow={nofollow}
        sponsored={sponsored}
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
  sponsored: PropTypes.bool,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  uiSettings: PropTypes.object,
  insertLinkFn: PropTypes.func,
  closeInlinePluginToolbar: PropTypes.func,
  linkTypes: PropTypes.object,
};
