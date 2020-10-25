import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'wix-rich-content-plugin-commons';
import { Checkbox } from 'wix-rich-content-editor-common';
import { isValidUrl, mergeStyles } from 'wix-rich-content-common';
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
    };
  }

  componentDidUpdate = () => {
    this.props.onSettingsChange(this.state);
  };

  handleKeyPress = e => {
    this.props.onKeyPress(e);
  };

  onTextChanged = buttonText => this.setState({ buttonText });

  onLinkChanged = url => {
    const validUrl = isValidUrl(url) || !url;
    this.setState({ url }, () => this.props.isValidUrl(validUrl));
  };

  handleTargetChange = event => {
    this.setState({ target: event.target.checked });
  };

  handleRelChange = event => {
    this.setState({ rel: event.target.checked });
  };

  onBlur = event => {
    this.setState({ target: event.target.checked });
  };

  render() {
    const { t, linkInputRef, isMobile, validUrl, shouldShowLink } = this.props;
    const { buttonText, url, target, rel } = this.state;
    const errorTooltip = !validUrl ? t('ButtonModal_Invalid_Link') : null;
    let style;
    if (!validUrl) {
      style = { paddingTop: isMobile ? '21px' : '25px' };
    } else {
      style = { paddingTop: isMobile ? '33px' : '34px' };
    }
    const textInputBaseProps = {
      inputRef: ref => (this.input = ref),
      type: 'text',
      onKeyPress: this.handleKeyPress,
      theme: this.styles,
      'data-hook': 'ButtonInputModal',
    };
    return (
      <div className={this.styles.button_settingsComponent_section_content}>
        <div className={this.styles.button_settingsComponent_name_feild}>
          <div className={this.styles.button_settingsComponent_header_ButtonText}>
            {t('ButtonModal_Button_Text')}
          </div>
          <div>
            <TextInput
              {...textInputBaseProps}
              onChange={this.onTextChanged}
              value={buttonText}
              placeholder={t('ButtonModal_InputName_Placeholder')}
            />
          </div>
        </div>
        {shouldShowLink && (
          <>
            <div
              className={this.styles.button_settingsComponent_header_ButtonLink}
              ref={linkInputRef}
            >
              {t('ButtonModal_Button_Link')}
            </div>
            <TextInput
              {...textInputBaseProps}
              onChange={this.onLinkChanged}
              onBlur={this.onBlur}
              value={url}
              placeholder={t('ButtonModal_Link_Input_Placeholder')}
              error={errorTooltip}
              showTooltip={false}
            />
            {!validUrl ? (
              <div className={this.styles.button_settingsComponent_errorMessage}>
                {t('ButtonModal_InputLink_ErrorMessage')}
              </div>
            ) : null}
            <div style={style} className={this.styles.button_settingsComponent_checkBoxes}>
              <Checkbox
                label={t('LinkPanel_Target_Checkbox')}
                theme={this.styles}
                checked={target}
                dataHook="linkPanelBlankCheckbox"
                onChange={this.handleTargetChange}
              />
              <Checkbox
                label={t('LinkPanel_Nofollow_Checkbox')}
                theme={this.styles}
                checked={rel}
                dataHook="linkPanelRelCheckbox"
                onChange={this.handleRelChange}
                tooltipTextKey={'LinkPanel_Nofollow_Checkbox_Tooltip'}
                t={t}
                isMobile={isMobile}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

SettingsComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  isValidUrl: PropTypes.func,
  onSettingsChange: PropTypes.func.isRequired,
  settingsObj: PropTypes.object.isRequired,
  validUrl: PropTypes.bool,
  isMobile: PropTypes.bool,
  onKeyPress: PropTypes.func,
  linkInputRef: PropTypes.func,
  onBlur: PropTypes.func,
  shouldShowLink: PropTypes.bool,
};

export default SettingsComponent;
