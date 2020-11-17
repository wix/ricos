import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isEqual } from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';
import { Tabs, Tab, SettingsPanelFooter } from 'wix-rich-content-plugin-commons';
import { KEYS_CHARCODE, FocusManager, ErrorIcon } from 'wix-rich-content-editor-common';
import { mergeStyles, isValidUrl } from 'wix-rich-content-common';
import DesignComponent from '../components/design-component';
import SettingsComponent from '../components/settings-component';
import Navbar from '../components/navbar';
import PreviewComponent from '../components/preview-component';
import { settingsTabValue, designTabValue } from '../constants';
import styles from '../../statics/styles/button-input-modal.scss';
export default class ButtonInputModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const {
      componentData: { button },
    } = this.props;

    this.state = {
      validUrl: isValidUrl(button.settings.url),
      settings: { ...button.settings },
      design: { ...button.design },
      initialComponentData: { ...button },
      isHover: false,
      activeTab: settingsTabValue,
      shouldShowLink: !this.props.settings.isActionButton,
    };

    this.setScrollbarRef = element => {
      this.scrollbarRef = element;
    };
  }

  onValidUrl = validUrl => {
    this.setState({ validUrl });
  };

  onSettingsChanged = settings => {
    const { design } = this.state;
    if (!isEqual(settings, this.state.settings)) {
      const {
        pubsub,
        componentData: { button },
      } = this.props;
      pubsub.update('componentData', { button: { ...button, settings, design } });
      this.setState({ settings });
    }
  };

  onDesignChanged = design => {
    const { settings } = this.state;
    if (this.state.activeTab !== designTabValue) {
      this.setState({ activeTab: designTabValue });
    }
    if (!isEqual(design, this.state.design)) {
      const {
        pubsub,
        componentData: { button },
      } = this.props;
      pubsub.update('componentData', { button: { ...button, design, settings } });
      this.setState({ design });
    }
  };

  onConfirm = () => {
    const { validUrl, shouldShowLink } = this.state;
    const {
      helpers: { closeModal },
    } = this.props;
    if (!shouldShowLink || validUrl) {
      this.setState({ submitted: true, isOpen: false });
      closeModal();
    } else {
      this.setState({ activeTab: settingsTabValue });
      this.linkInput.scrollIntoView(false);
    }
  };

  handleKeyPress = e => {
    if (e.charCode === KEYS_CHARCODE.ENTER) {
      this.onConfirm();
    }
    if (e.charCode === KEYS_CHARCODE.ESCAPE) {
      this.onCloseRequested();
    }
  };

  onCloseRequested = () => {
    const {
      componentData,
      pubsub,
      onCloseRequested,
      helpers: { closeModal },
    } = this.props;
    const { initialComponentData } = this.state;
    if (onCloseRequested) {
      onCloseRequested({ ...componentData, button: initialComponentData });
    } else {
      pubsub.update('componentData', { button: initialComponentData });
    }

    this.setState({ isOpen: false });
    closeModal();
  };

  handleOnMouseEnterDesign = () => {
    this.setState({ isHover: true, activeTab: designTabValue });
  };

  handleOnMouseLeaveDesign = () => {
    this.setState({ isHover: false });
  };

  handleOnMouseEnterSettings = () => {
    this.setState({ activeTab: settingsTabValue });
  };

  render() {
    const { theme, t, uiSettings, doneLabel, cancelLabel, isMobile } = this.props;
    const { shouldShowLink } = this.state;
    const { styles } = this;
    const settingTabLabel = (
      <div className={styles.button_inputModal_settingTab}>
        <div className={styles.button_inputModal_tabTitle}>
          <p className={styles.button_inputModal_tabLabel}>{t('ButtonModal_Settings_Tab')}</p>
        </div>
        {shouldShowLink && (
          <div className={styles.button_inputModal_errorIcon}>
            {!this.state.validUrl ? <ErrorIcon width="18" height="18" /> : null}
          </div>
        )}
      </div>
    );
    const designTabLabel = (
      <p className={styles.button_inputModal_tabLabel}>{t('ButtonModal_Design_Tab')}</p>
    );
    const settingsComponent = (
      <SettingsComponent
        t={t}
        theme={theme}
        uiSettings={uiSettings}
        {...this.props}
        isValidUrl={this.onValidUrl.bind(this)}
        onSettingsChange={this.onSettingsChanged.bind(this)}
        validUrl={this.state.validUrl}
        settingsObj={this.state.settings}
        onKeyPress={this.handleKeyPress}
        linkInputRef={ref => {
          this.linkInput = ref;
        }}
        shouldShowLink={shouldShowLink}
      />
    );
    const designComponent = (
      <DesignComponent
        {...this.props}
        theme={theme}
        t={t}
        styles={styles}
        onDesignChange={this.onDesignChanged.bind(this)}
        designObj={this.state.design}
        onKeyPress={this.handleKeyPress}
      />
    );
    let mobileView = null;
    if (isMobile) {
      mobileView = (
        <div>
          <Navbar onConfirm={this.onConfirm} onCancel={this.onCloseRequested} {...this.props} />
          <PreviewComponent buttonObj={this.state} {...this.props} />
          <div className={styles.button_inputModal_scroll} ref={this.setScrollbarRef}>
            <div className={styles.button_inputModal_container} data-hook="ButtonInputModal">
              <div className={styles.button_inputModal_header_text}>
                {t('ButtonModal_Settings_Tab')}
              </div>
              {settingsComponent}
            </div>
            <div className={styles.button_inputModal_separator} />
            <div
              className={styles.button_inputModal_design_component_container}
              data-hook="ButtonInputModal"
            >
              <div className={styles.button_inputModal_design_header_text}>
                {t('ButtonModal_Design_Tab')}
              </div>
              {designComponent}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        {isMobile ? (
          mobileView
        ) : (
          <div className={styles.button_inputModal_container} data-hook="ButtonInputModal">
            <div>
              <div
                role="heading"
                aria-level={2}
                aria-labelledby="button_modal_hdr"
                className={styles.button_inputModal_header}
              >
                <div className={styles.button_inputModal_header_text}>
                  {t('ButtonModal_Header')}
                </div>
              </div>
              <FocusManager>
                <div className={styles.button_inputModal_focus_manager}>
                  <Tabs value={this.state.activeTab} theme={this.styles}>
                    <Tab label={settingTabLabel} value={settingsTabValue} theme={this.styles}>
                      <div
                        role="button"
                        tabIndex="0"
                        onMouseEnter={this.handleOnMouseEnterSettings}
                      >
                        {settingsComponent}
                      </div>
                    </Tab>
                    <Tab label={designTabLabel} value={designTabValue} theme={this.styles}>
                      <Scrollbars
                        ref={this.setScrollbarRef}
                        renderThumbVertical={() =>
                          this.state.isHover ? (
                            <div className={styles.button_inputModal_scrollbar_thumb} />
                          ) : (
                            <div />
                          )
                        }
                        className={styles.button_inputModal_customize_scrollbar_container}
                        onMouseEnter={this.handleOnMouseEnterDesign}
                        onMouseLeave={this.handleOnMouseLeaveDesign}
                      >
                        {designComponent}
                      </Scrollbars>
                    </Tab>
                  </Tabs>
                </div>
              </FocusManager>
            </div>
            <SettingsPanelFooter
              className={styles.button_inputModal_modal_footer}
              save={() => this.onConfirm()}
              cancel={() => this.onCloseRequested()}
              saveLabel={doneLabel}
              cancelLabel={cancelLabel}
              theme={styles}
              t={t}
            />
          </div>
        )}
      </div>
    );
  }
}

ButtonInputModal.propTypes = {
  componentData: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  style: PropTypes.object,
  buttonObj: PropTypes.object,
  anchorTarget: PropTypes.string.isRequired,
  relValue: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  blockProps: PropTypes.object,
  pubsub: PropTypes.object,
  onConfirm: PropTypes.func,
  onCloseRequested: PropTypes.func,
  doneLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  uiSettings: PropTypes.object,
  helpers: PropTypes.object,
  isMobile: PropTypes.bool,
};

ButtonInputModal.defaultProps = {
  doneLabel: 'Save',
  cancelLabel: 'Cancel',
};
