import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import {
  insertLinkAtCurrentSelection,
  getLinkDataInSelection,
  removeLinksInSelection,
} from 'wix-rich-content-editor-common';
import MobileLinkModal from './MobileLinkModal';

export default class MobileTextLinkModal extends Component {
  hidePopup = () => this.props.hidePopup();

  createLinkEntity = ({ url, targetBlank, nofollow }) => {
    if (!isEmpty(url)) {
      const { getEditorState, setEditorState, anchorTarget, relValue } = this.props;
      const newEditorState = insertLinkAtCurrentSelection(getEditorState(), {
        url,
        targetBlank,
        nofollow,
        anchorTarget,
        relValue,
      });
      setEditorState(newEditorState);
    }
    this.hidePopup();
  };

  deleteLink = () => {
    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    const newEditorState = removeLinksInSelection(editorState, setEditorState);
    setEditorState(newEditorState);
  };

  render() {
    const { getEditorState, theme, isMobile, anchorTarget, relValue, t, uiSettings } = this.props;
    const linkData = getLinkDataInSelection(getEditorState());
    const { url, target, rel } = linkData || {};
    const targetBlank = target ? target === '_blank' : anchorTarget === '_blank';
    const nofollow = rel ? rel === 'nofollow' : relValue === 'nofollow';
    return (
      <MobileLinkModal
        url={url}
        targetBlank={targetBlank}
        nofollow={nofollow}
        theme={theme}
        isActive={!isEmpty(linkData)}
        isMobile={isMobile}
        anchorTarget={anchorTarget}
        relValue={relValue}
        onDone={this.createLinkEntity}
        onCancel={this.hidePopup}
        onDelete={this.deleteLink}
        uiSettings={uiSettings}
        t={t}
      />
    );
  }
}

MobileTextLinkModal.propTypes = {
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
};
