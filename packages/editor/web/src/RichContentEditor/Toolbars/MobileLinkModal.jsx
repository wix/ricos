import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinkPanelContainer } from 'wix-rich-content-editor-common';
import { LinkIcon } from '../icons';
import styles from '../../../statics/styles/mobile-link-modal.scss';

export default class MobileLinkModal extends Component {
  render() {
    const {
      url,
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
      unchangedUrl,
    } = this.props;
    const mobileLinkModalTitle = t('MobileLinkModal_Title');
    return (
      <div>
        <div className={styles.mobileLinkModal_titleContainer}>
          <div className={styles.mobileLinkModal_linkIconContainer}>
            <LinkIcon />
          </div>
          <h3 id="mob_link_modal_hdr" className={styles.mobileLinkModal_title}>
            {mobileLinkModalTitle}
          </h3>
        </div>
        <LinkPanelContainer
          url={url}
          targetBlank={targetBlank}
          anchorTarget={anchorTarget}
          relValue={relValue}
          nofollow={nofollow}
          theme={theme}
          isActive={isActive}
          isMobile={isMobile}
          onDone={onDone}
          onCancel={onCancel}
          hidePanel={onCancel}
          onDelete={onDelete}
          t={t}
          ariaProps={{ 'aria-labelledby': 'mob_link_modal_hdr' }}
          uiSettings={uiSettings}
          unchangedUrl={unchangedUrl}
        />
      </div>
    );
  }
}

MobileLinkModal.propTypes = {
  theme: PropTypes.object.isRequired,
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  isMobile: PropTypes.bool,
  url: PropTypes.string,
  targetBlank: PropTypes.bool,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  nofollow: PropTypes.bool,
  t: PropTypes.func,
  uiSettings: PropTypes.object,
  unchangedUrl: PropTypes.bool,
};
