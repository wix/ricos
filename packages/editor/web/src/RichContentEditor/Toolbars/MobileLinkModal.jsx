import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinkPanelContainer } from 'wix-rich-content-editor-common';

export default class MobileLinkModal extends Component {
  render() {
    const {
      url,
      anchor,
      targetBlank,
      anchorTarget,
      relValue,
      nofollow,
      theme,
      isMobile,
      isActive,
      onDone,
      onCancel,
      onDelete,
      t,
      uiSettings,
      editorState,
      unchangedUrl,
      linkTypes,
    } = this.props;
    const baseLinkProps = {
      editorState,
      url,
      anchor,
      targetBlank,
      anchorTarget,
      relValue,
      nofollow,
      theme,
      isActive,
      isMobile,
      onDone,
      onCancel,
      onDelete,
      t,
      ariaProps: { 'aria-labelledby': 'mob_link_modal_hdr' },
      uiSettings,
      hidePanel: { onCancel },
      unchangedUrl,
      linkTypes,
    };
    return (
      <div>
        <LinkPanelContainer linkPanelWithTitle {...baseLinkProps} />
      </div>
    );
  }
}

MobileLinkModal.propTypes = {
  editorState: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  isMobile: PropTypes.bool,
  url: PropTypes.string,
  anchor: PropTypes.string,
  targetBlank: PropTypes.bool,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  nofollow: PropTypes.bool,
  t: PropTypes.func,
  uiSettings: PropTypes.object,
  unchangedUrl: PropTypes.bool,
  linkTypes: PropTypes.object,
};
