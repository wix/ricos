import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import {
  mergeStyles,
  CloseIcon,
  Tabs,
  Tab,
  FocusManager,
  ErrorIcon,
} from 'wix-rich-content-common';
import DesignComponent from './../components/design-component';
import SettingsComponent from './../components/settings-component';
import styles from '../../statics/styles/button-input-modal.scss';

export default class ButtonInputModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      validUrl: true,
    };
  }

  onCloseRequested = () => {
    this.setState({ isOpen: false });
    this.props.helpers.closeModal();
  };

  onValidUrl = validUrl => {
    this.setState({ validUrl });
  }

  render() {
    const { theme, t, uiSettings } = this.props;
    const { styles } = this;
    const settingTab = (
      <div className={styles.settingTab}>
        <div className={styles.tabTitle}>
          {t('ButtonModal_Settings_Tab')}
        </div>
        <div className={styles.errorIcon}>
          {!this.state.validUrl ?
            <ErrorIcon width="18" height="18" /> :
            null
          }
        </div>
      </div>);
    return (
      <div className={styles.container} data-hook="ButtonInputModal">
        <CloseIcon className={classNames(styles.closeIcon)} onClick={() => this.onCloseRequested()} />
        <div role="heading" aria-labelledby="button_modal_hdr" className={classNames(styles.header)}>
          <h3 id="button_modal_hdr" className={styles.header_text}>
            {t('ButtonModal_Header')}
          </h3>
        </div>
        <FocusManager>
          <div>
            <Tabs value={'manage_setting'} theme={theme} >
              <Tab label={settingTab} value={'manage_setting'} theme={theme}>
                <SettingsComponent
                  t={t}
                  theme={theme}
                  componentData={this.props.componentData}
                  uiSettings={uiSettings}
                  {...this.props}
                  onCloseRequested={this.onCloseRequested}
                  onValidUrl={this.onValidUrl.bind(this)}
                />
              </Tab>
              <Tab label={t('ButtonModal_Design_Tab')} value={'manage_design'} theme={theme}>
                <DesignComponent
                  componentData={this.props}
                  {...this.props}
                  theme={theme}
                  t={t}
                  styles={styles}
                  onCloseRequested={this.onCloseRequested}
                />
              </Tab>
            </Tabs>
          </div>
        </FocusManager>
      </div>
    );
  }
}

ButtonInputModal.propTypes = {
  componentData: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
};
