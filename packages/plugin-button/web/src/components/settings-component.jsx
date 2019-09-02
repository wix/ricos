import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, TextInput, Checkbox, isValidUrl } from 'wix-rich-content-common';
import styles from '../../statics/styles/settings-component-styles.scss';

class SettingsComponent extends PureComponent {
  constructor(props) {
    super(props);
    const { settingsObj } = this.props;
    this.styles = mergeStyles({ styles, theme: props.theme });
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
  };

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
  };

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

  onBlur = event => {
    const { url } = this.state;
    this.setState({ target: event.target.checked });
    if (isValidUrl(url)) {
      this.setState({ validUrl: true });
    } else {
      this.setState({ validUrl: false });
    }
  };

  render() {
    const { t, linkInputRef, isMobile } = this.props;
    const { buttonText, url, validUrl } = this.state;
    const errorTooltip = !validUrl || !this.props.validUrl ? t('ButtonModal_Invalid_Link') : null;
    return (
      <div className={this.styles.section_content}>
        <div className={this.styles.button_name_feild}>
          <div className={this.styles.header_ButtonText}>{t('ButtonModal_Button_Text')}</div>
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
        <div className={this.styles.header_ButtonLink} ref={linkInputRef}>
          {t('ButtonModal_Button_Link')}
        </div>
        <TextInput
          inputRef={ref => {
            this.input = ref;
          }}
          type="text"
          onKeyPress={this.handleKeyPress}
          onChange={this.onLinkChanged}
          onBlur={this.onBlur}
          value={url}
          placeholder={t('ButtonModal_Link_Input_Placeholder')}
          theme={this.styles}
          error={errorTooltip}
          showTooltip={false}
          data-hook="ButtonInputModal"
        />
        {!this.state.validUrl || !this.props.validUrl ? (
          <div className={this.styles.errorMessage}>{t('ButtonModal_InputLink_ErrorMessage')}</div>
        ) : null}
        <div
          style={{
            paddingTop:
              !this.state.validUrl || !this.props.validUrl
                ? isMobile
                  ? '21px'
                  : '25px'
                : isMobile
                ? '24px'
                : '34px',
          }}
          className={this.styles.checkBoxes}
        >
          <Checkbox
            label={t('LinkPanel_Target_Checkbox')}
            theme={this.styles}
            checked={this.state.target}
            dataHook="linkPanelBlankCheckbox"
            onChange={this.handleTargetChange}
          />
          <Checkbox
            label={t('LinkPanel_Nofollow_Checkbox')}
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
  isMobile: PropTypes.bool,
  onKeyPress: PropTypes.func,
  linkInputRef: PropTypes.func,
  onBlur: PropTypes.func,
};

export default SettingsComponent;
