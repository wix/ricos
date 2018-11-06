import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import {
  mergeStyles,
  CloseIcon,
  Tabs,
  Tab,
  FocusManager,
  ErrorIcon,
  WixUtils,
  SettingsPanelFooter,
  isValidUrl
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
      data: {},
      design: {},
      initState: {
        design: {},
        data: {}
      }
    };
  }
  componentDidMount = () => {
  }


  onCloseRequested = () => {
    this.setState({ isOpen: false });
    this.props.helpers.closeModal();
  };

  onValidUrl = validUrl => {
    this.setState({ validUrl });
  }

  onSettingsChange = data => {
    if (!isEqual(data, this.state.data)) {
      this.setState({ data });
    }
  }

  onDesignChange = design => {
    if (!isEqual(design, this.state.design)) {
      this.setState({ design });
    }
  }

  handleInitialDesign = design => {
    this.setState({ design, initState: { ...this.initState, design } });
  }

  handleInitialSettings = data => {
    this.setState({ data, initState: { ...this.initState, data } });
  }

  onConfirm = () => {
    const { url } = this.state.data;
    const { componentData, pubsub, onConfirm } = this.props;
    if (isValidUrl(url) || !url) {
      this.setState({ validUrl: true });
      if (onConfirm) {
        onConfirm({ ...componentData, ...this.state.data, ...this.state.design });
      } else {
        pubsub.update('componentData', { ...this.state.data, ...this.state.design });
      }

      this.setState({ isOpen: false });
      this.props.helpers.closeModal();
      this.setState({ submitted: true });
    } else {
      this.setState({ validUrl: false });
    }
  };

  onCloseRequested = () => {
    const { componentData, pubsub, onCloseRequested } = this.props;
    if (onCloseRequested) {
      onCloseRequested({ ...componentData, ...this.state.initState.data, ...this.state.initState.design });
    } else {
      pubsub.update('componentData', { ...this.state.initState.data, ...this.state.initState.design });
    }

    this.setState({ isOpen: false });
    this.props.helpers.closeModal();
  };


  render() {
    // const activeButton = (this.state.initState.activeButton) ? this.state.initState.activeButton : null;
    const { theme, t, uiSettings, doneLabel, cancelLabel } = this.props;
    const { styles } = this;
    const settingTabLabel = (
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

    let mobileView = null;
    if (WixUtils.isMobile()) {
      mobileView = (
        <div className={styles.container} data-hook="ButtonInputModal">
          <div className={styles.header_text}>{t('ButtonModal_Settings_Tab')}</div>
          <SettingsComponent
            t={t}
            theme={theme}
            componentData={this.props.componentData}
            uiSettings={uiSettings}
            {...this.props}
            onCloseRequested={this.onCloseRequested}
            onValidUrl={this.onValidUrl.bind(this)}
            onSettingsChange={this.onSettingsChange.bind(this)}
            initailState={this.handleInitialSettings.bind(this)}
          />
          <hr />
          <div className={styles.header_text}>{t('ButtonModal_Design_Tab')}</div>
          <DesignComponent
            componentData={this.props}
            {...this.props}
            theme={theme}
            t={t}
            styles={styles}
            onCloseRequested={this.onCloseRequested}
            onDesignChange={this.onDesignChange.bind(this)}
            initailStateHandler={this.handleInitialDesign.bind(this)}
            initailState={this.state.initState.design}
          />
        </div>
      );
    }
    return (
      <div className={styles.container} data-hook="ButtonInputModal">
        {!mobileView ?
          <div>
            <CloseIcon className={classNames(styles.closeIcon)} onClick={() => this.onCloseRequested()} />
            <div role="heading" aria-labelledby="button_modal_hdr" className={classNames(styles.header)}>
              <h3 id="button_modal_hdr" className={styles.header_text}>
                {t('ButtonModal_Header')}
              </h3>
            </div>
            <FocusManager>
              <div style={{ borderTop: '1px solid #ededed' }}>
                <Tabs value={'manage_setting'} theme={theme}>
                  <Tab label={settingTabLabel} value={'manage_setting'} theme={theme}>
                    <SettingsComponent
                      t={t}
                      theme={theme}
                      componentData={this.props.componentData}
                      uiSettings={uiSettings}
                      {...this.props}
                      onCloseRequested={this.onCloseRequested}
                      onValidUrl={this.onValidUrl.bind(this)}
                      onSettingsChange={this.onSettingsChange.bind(this)}
                      initailState={this.handleInitialSettings.bind(this)}
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
                      onDesignChange={this.onDesignChange.bind(this)}
                      initailStateHandler={this.handleInitialDesign.bind(this)}
                      initailState={this.state.initState.design}
                    />
                  </Tab>
                </Tabs>
              </div>
            </FocusManager>
          </div> : mobileView
        }
        <SettingsPanelFooter
          className={styles.modal_footer}
          save={() => this.onConfirm()}
          cancel={() => this.onCloseRequested()}
          saveLabel={doneLabel}
          cancelLabel={cancelLabel}
          theme={theme}
          t={t}
        />
      </div>
    );
  }
}

ButtonInputModal.propTypes = {
  componentData: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
};

ButtonInputModal.defaultProps = {
  doneLabel: 'Save',
  cancelLabel: 'Cancel',
};
