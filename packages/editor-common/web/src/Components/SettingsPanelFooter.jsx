import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../../statics/styles/settings-panel-footer.scss';

class SettingsPanelFooter extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { save, cancel, theme, cancelLabel, saveLabel, fixed, className, t } = this.props;
    const saveText = saveLabel || t('SettingsPanelFooter_Done');
    const cancelText = cancelLabel || t('SettingsPanelFooter_Cancel');

    return (
      <div
        className={classNames(this.styles.settingsPanel_footer, className, {
          [this.styles.settingsPanel_footer_fixed]: fixed || false,
        })}
      >
        <Button
          theme={theme}
          ariaProps={{ 'aria-label': cancelText }}
          dataHook="settingPanelFooterCancel"
          onClick={() => cancel()}
          className={this.styles.settingsPanel_cancel}
          type={'secondary'}
        >
          {cancelText}
        </Button>
        <Button
          ariaProps={{ 'aria-label': saveText }}
          theme={theme}
          className={this.styles.settingsPanel_save}
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
};

export default SettingsPanelFooter;
