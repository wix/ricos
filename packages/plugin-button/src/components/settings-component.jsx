import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  mergeStyles,
  TextInput,
  SettingsPanelFooter,
  Checkbox,
  isValidUrl,
} from 'wix-rich-content-common';
import styles from '../../statics/styles/settings-component-styles.scss';



class SettingsComponent extends PureComponent {
  constructor(props) {
    super(props);
    const { componentData, t } = this.props;
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.firstCheckboxText = t('LinkPanel_Target_Checkbox');
    this.secondCheckboxText = t('LinkPanel_Nofollow_Checkbox');
    this.inputPlaceholder = t('LinkPanel_InputPlaceholder');
    this.errorTooltipText = t('LinkPanel_ErrorTooltip');

    this.state = {
      url: componentData.url || '',
      buttonName: componentData.buttonName || 'Click Me',
      targetBlank: componentData.targetBlank || false,
      nofollow: componentData.nofollow || false,
      validUrl: componentData.validUrl || true,
      submitted: componentData.submitted || true,
    };
  }

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onConfirm();
    }
  };

  onTextChanged = e => {
    const buttonName = e.target.value;
    this.setState({ buttonName });
  };

  onLinkChanged = e => {
    const url = e.target.value;
    this.setState({ url });
    if (isValidUrl(url) || !url) {
      this.setState({ validUrl: true });
      this.props.onValidUrl(true);
    }
  }

  handleTargetChange = event => {
    const { url } = this.state;
    this.setState({ targetBlank: event.target.checked });
    if (isValidUrl(url)) {
      this.setState({ validUrl: true });
    } else {
      this.setState({ validUrl: false });
    }
  };

  handleNofollowChange = event => {
    const { url } = this.state;
    this.setState({ nofollow: event.target.checked });
    if (isValidUrl(url)) {
      this.setState({ validUrl: true });
    } else {
      this.setState({ validUrl: false });
    }

  };


  onConfirm = () => {
    const { buttonName, url, targetBlank, nofollow } = this.state;
    const { componentData, pubsub, onConfirm, onCloseRequested } = this.props;
    if (isValidUrl(url)) {
      this.props.onValidUrl(true);
      if (onConfirm) {
        onConfirm({ ...componentData, buttonName, url, targetBlank, nofollow, validUrl: isValidUrl(url) });
      } else {
        pubsub.update('componentData', { buttonName, url, targetBlank, nofollow, validUrl: isValidUrl(url) });
      }
      onCloseRequested();
      this.setState({ submitted: true });
    } else {
      this.setState({ validUrl: false });
      this.props.onValidUrl(false);
    }
  };

  render() {
    const { theme, doneLabel, cancelLabel, t } = this.props;
    const { buttonName, url, validUrl } = this.state;
    const paddingTop = (!validUrl) ? '21px' : '35px';
    const errorTooltip = (!validUrl) ? 'Invalid link' : false;
    return (
      <div className={styles.section_content}>
        <div className={styles.header_text}>
          {t('ButtonModal_Button_Text')}
        </div>
        <div>
          <TextInput
            inputRef={ref => {
              this.input = ref;
            }}
            type="text"
            onKeyPress={this.handleKeyPress}
            onChange={this.onTextChanged}
            value={buttonName}
            placeholder={t('ButtonModal_InputName_Placeholder')}
            theme={theme}
            data-hook="ButtonInputModal"
          />
        </div>
        <br />
        <div className={styles.header_text}>
          {t('ButtonModal_Button_Link')}
        </div>
        <TextInput
          inputRef={ref => {
            this.input = ref;
          }}
          type="text"
          onKeyPress={this.handleKeyPress}
          onChange={this.onLinkChanged}
          value={url}
          placeholder={t('LinkPanel_InputPlaceholder')}
          theme={theme}
          error={errorTooltip}
          data-hook="ButtonInputModal"
        />
        {!this.state.validUrl ?
          <div className={styles.errorMessage}>
            {t('ButtonModal_InputLink_ErrorMessage')}
          </div> :
          null
        }
        <div className={styles.checkBoxes} style={{ paddingTop }}>
          <Checkbox
            label={this.firstCheckboxText}
            theme={theme}
            checked={this.state.targetBlank}
            dataHook="linkPanelBlankCheckbox"
            onChange={this.handleTargetChange}
          />
          <Checkbox
            label={this.secondCheckboxText}
            theme={theme}
            checked={this.state.nofollow}
            dataHook="linkPanelRelCheckbox"
            onChange={this.handleNofollowChange}
          />
        </div>
        <SettingsPanelFooter
          className={styles.modal_footer}
          save={() => this.onConfirm()}
          cancel={() => this.props.onCloseRequested()}
          saveLabel={doneLabel}
          cancelLabel={cancelLabel}
          theme={theme}
          t={t}
        />
      </div>
    );
  }
}

SettingsComponent.defaultProps = {
  doneLabel: 'Save',
  cancelLabel: 'Cancel',
};

SettingsComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object,
  t: PropTypes.func,
  onValidUrl: PropTypes.func,
  pubsub: PropTypes.object,
  onConfirm: PropTypes.func,
  onCloseRequested: PropTypes.func,
  doneLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
};

export default SettingsComponent;
