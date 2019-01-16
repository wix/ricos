import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  mergeStyles,
  TextInput,
  Checkbox,
  isValidUrl,
  WixUtils
} from 'wix-rich-content-common';
import styles from '../../statics/styles/settings-component-styles.scss';



class SettingsComponent extends PureComponent {
  constructor(props) {
    super(props);
    const { settingsObj, t } = this.props;
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.targetCheckboxText = t('LinkPanel_Target_Checkbox');
    this.nofollowCheckboxText = t('LinkPanel_Nofollow_Checkbox');
    this.inputPlaceholder = t('ButtonModal_Link_Input_Placeholder');
    this.errorTooltipText = t('LinkPanel_ErrorTooltip');
    this.state = {
      url: settingsObj.url || '',
      buttonText: settingsObj.buttonText,
      target: settingsObj.target || false,
      rel: settingsObj.rel || false,
      validUrl: settingsObj.validUrl || true,
      submitted: settingsObj.submitted || true,
    };
  }


  componentDidUpdate = () => {
    this.props.onSettingsChange(this.state);
  }


  handleKeyPress = e => {
    this.props.onKeyPress(e);
  };

  onTextChanged = e => {
    const buttonText = e.target.value;
    this.setState({ buttonText });
  };

  onLinkChanged = e => {
    const url = e.target.value;
    this.setState({ url });
    if (isValidUrl(url) || !url) {
      this.setState({ validUrl: true });
      this.props.isValidUrl(true);
    }
  }

  handleTargetChange = event => {
    const { url } = this.state;
    this.setState({ target: event.target.checked });
    if (isValidUrl(url)) {
      this.setState({ validUrl: true });
    } else {
      this.setState({ validUrl: false });
    }
  };

  handleRelChange = event => {
    const { url } = this.state;
    this.setState({ rel: event.target.checked });
    if (isValidUrl(url)) {
      this.setState({ validUrl: true });
    } else {
      this.setState({ validUrl: false });
    }
  };

  render() {
    const { t, linkInputRef } = this.props;
    const { buttonText, url, validUrl } = this.state;
    const errorTooltip = (!validUrl || !this.props.validUrl) ? t('ButtonModal_Invalid_Link') : false;
    return (
      <div className={styles.section_content}>
        <div className={styles.button_name_feild}>
          <div className={styles.header_ButtonText}>
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
              value={buttonText}
              placeholder={t('ButtonModal_InputName_Placeholder')}
              theme={this.styles}
              data-hook="ButtonInputModal"
            />
          </div>
        </div>
        <div className={styles.header_ButtonLink} ref={linkInputRef}>
          {t('ButtonModal_Button_Link')}
        </div>
        <TextInput
          inputRef={ref => {
            this.input = ref;
          }}
          type="text"
          onKeyPress={this.handleKeyPress}
          onChange={this.onLinkChanged}
          onBlur={this.props.onBlur}
          value={url}
          placeholder={t('ButtonModal_Link_Input_Placeholder')}
          theme={this.styles}
          error={errorTooltip}
          showTooltip={false}
          data-hook="ButtonInputModal"
        />
        {!this.state.validUrl || !this.props.validUrl ?
          <div className={styles.errorMessage}>
            {t('ButtonModal_InputLink_ErrorMessage')}
          </div> :
          null
        }
        <div
          style={{ paddingTop: !this.state.validUrl || !this.props.validUrl ? ((WixUtils.isMobile()) ? '21px' : '25px') : '34px' }}
          className={styles.checkBoxes}
        >
          <Checkbox
            label={this.targetCheckboxText}
            theme={this.styles}
            checked={this.state.target}
            dataHook="linkPanelBlankCheckbox"
            onChange={this.handleTargetChange}
          />
          <Checkbox
            label={this.nofollowCheckboxText}
            theme={this.styles}
            checked={this.state.rel}
            dataHook="linkPanelRelCheckbox"
            onChange={this.handleRelChange}
          />
        </div>
      </div>
    );
  }
}

SettingsComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object,
  t: PropTypes.func,
  isValidUrl: PropTypes.func,
  onSettingsChange: PropTypes.func.isRequired,
  settingsObj: PropTypes.object.isRequired,
  validUrl: PropTypes.bool,
  onKeyPress: PropTypes.func,
  linkInputRef: PropTypes.object,
  onBlur: PropTypes.func
};

export default SettingsComponent;
