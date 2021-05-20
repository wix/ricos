import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'wix-rich-content-plugin-commons';
import { LinkPanel } from 'wix-rich-content-editor-common';
import {
  isValidUrl,
  mergeStyles,
  convertRelObjectToString,
  convertRelStringToObject,
} from 'wix-rich-content-common';
import styles from '../../statics/styles/settings-component-styles.scss';

class SettingsComponent extends PureComponent {
  constructor(props) {
    super(props);
    const { settingsObj } = this.props;
    this.styles = mergeStyles({ styles, theme: props.theme });
    const linkButtonSettings = settingsObj.url
      ? {
          url: settingsObj.url,
          target: settingsObj.target,
          rel: settingsObj.rel,
        }
      : {};
    this.state = {
      buttonText: settingsObj.buttonText,
      ...linkButtonSettings,
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

  linkPanelToLink = ({ url, targetBlank, rel }) => ({
    url,
    target: targetBlank
      ? '_blank'
      : this.props.anchorTarget !== '_blank'
      ? this.props.anchorTarget
      : '_self',
    rel: convertRelObjectToString(rel),
  });

  linkToLinkPanel = ({ url = '', target, rel }) => ({
    url,
    targetBlank: target ? target === '_blank' : this.props.anchorTarget === '_blank',
    rel: convertRelStringToObject(rel),
  });

  onLinkPanelChange = linkPanelValues => {
    this.setState({ ...this.linkPanelToLink(linkPanelValues) });
  };

  render() {
    const { t, shouldShowLink, uiSettings, theme } = this.props;
    const { buttonText, url, target, rel } = this.state;
    const { linkPanel } = uiSettings || {};
    const { showNewTabCheckbox, showNoFollowCheckbox, showSponsoredCheckbox } = linkPanel || {};

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
            <div className={this.styles.button_settingsComponent_header_ButtonLink}>
              {t('ButtonModal_Button_Link')}
            </div>
            <LinkPanel
              linkValues={this.linkToLinkPanel({ url, target, rel })}
              onChange={this.onLinkPanelChange}
              showNewTabCheckbox={showNewTabCheckbox}
              showNoFollowCheckbox={showNoFollowCheckbox}
              showSponsoredCheckbox={showSponsoredCheckbox}
              theme={theme}
              t={t}
            />
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
  onBlur: PropTypes.func,
  shouldShowLink: PropTypes.bool,
  anchorTarget: PropTypes.string,
  uiSettings: PropTypes.object,
};

export default SettingsComponent;
