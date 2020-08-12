import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/settings-panel-footer.scss';

class SettingsPanelFooter extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const {
      save,
      cancel,
      theme,
      cancelLabel,
      saveLabel,
      fixed,
      className,
      t,
      isModal,
      flexEndModalButtons,
    } = this.props;
    const saveText = saveLabel || t('SettingsPanelFooter_Done');
    const cancelText = cancelLabel || t('SettingsPanelFooter_Cancel');

    return (
      <div
        className={classNames(
          this.styles.settingsPanel_footer,
          className,
          isModal && this.styles.modal,
          flexEndModalButtons && this.styles.flexEndModalButtons,
          {
            [this.styles.settingsPanel_footer_fixed]: fixed || false,
          }
        )}
      >
        <Button
          theme={theme}
          ariaProps={{ 'aria-label': cancelText }}
          dataHook="settingPanelFooterCancel"
          onClick={() => cancel()}
          className={classNames(
            this.styles.settingsPanel_cancel,
            isModal && this.styles.modal,
            flexEndModalButtons && this.styles.flexEndModalButtons
          )}
          type={'secondary'}
        >
          {cancelText}
        </Button>
        <Button
          ariaProps={{ 'aria-label': saveText }}
          theme={theme}
          className={classNames(
            this.styles.settingsPanel_save,
            isModal && this.styles.modal,
            flexEndModalButtons && this.styles.flexEndModalButtons
          )}
          dataHook="settingPanelFooterDone"
          onClick={() => save()}
        >
          {saveText}
        </Button>
      </div>
    );
  }
}

SettingsPanelFooter.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  saveLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  fixed: PropTypes.bool,
  className: PropTypes.string,
  t: PropTypes.func,
  isModal: PropTypes.bool,
  flexEndModalButtons: PropTypes.bool,
};

export default SettingsPanelFooter;
