import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isEqual } from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  mergeStyles,
  Tabs,
  Tab,
  FocusManager,
  ErrorIcon,
  SettingsPanelFooter,
  isValidUrl,
} from 'wix-rich-content-common';
import DesignComponent from './../components/design-component';
import SettingsComponent from './../components/settings-component';
import Navbar from './../components/navbar';
import PreviewComponent from './../components/preview-component';
import { settingsTabValue, designTabValue } from '../../src/constants';
import styles from '../../statics/styles/button-input-modal.scss';
export default class ButtonInputModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const {
      settings: { colors },
      componentData,
      relValue,
      anchorTarget,
    } = this.props;
    const initialButtonColors = {
      textColor: colors.color1,
      borderColor: colors.color8,
      backgroundColor: colors.color8,
    };

    let buttonObj = {};
    if (componentData.button) {
      buttonObj = {
        ...componentData.button,
      };
    }
    if (!('rel' in buttonObj) && relValue === 'nofollow') {
      buttonObj.rel = true;
    }
    if (!('target' in buttonObj) && anchorTarget === '_blank') {
      buttonObj.target = true;
    }

    if (!buttonObj.textColor) {
      buttonObj = { ...buttonObj, ...initialButtonColors };
    }

    this.state = {
      isValidUrl: true,
      data: { ...buttonObj },
      design: { ...buttonObj },
      initialComponentData: {},
      isHover: false,
      activeTab: settingsTabValue,
    };

    this.setScrollbarRef = element => {
      this.scrollbarRef = element;
    };
  }

  componentDidMount = () => {
    const {
      settings: { colors },
      componentData: { button },
    } = this.props;
    const initialButtonColors = {
      textColor: colors.color1,
      borderColor: colors.color8,
      backgroundColor: colors.color8,
    };
    if (!button.textColor) {
      this.setState({ initialComponentData: { ...button, ...initialButtonColors } });
    } else {
      this.setState({ initialComponentData: button });
    }
  };

  onValidUrl = isValidUrl => {
    this.setState({ isValidUrl });
  };

  onSettingsChanged = data => {
    const buttonObj = {
      ...this.state.data,
      ...data,
    };
    if (!isEqual(data, this.state.data)) {
      const { pubsub } = this.props;
      pubsub.update('componentData', { button: buttonObj });
      this.setState({ data });
    }
  };

  onDesignChanged = design => {
    if (this.state.activeTab !== designTabValue) {
      this.setState({ activeTab: designTabValue });
    }
    const buttonObj = {
      ...this.state.data,
      ...design,
    };
    if (!isEqual(design, this.state.design)) {
      const { pubsub } = this.props;
      pubsub.update('componentData', { button: buttonObj });
      this.setState({ design });
    }
  };

  onConfirm = () => {
    const { url } = this.state.data;
    const {
      componentData,
      pubsub,
      onConfirm,
      helpers: { closeModal },
    } = this.props;
    const buttonObj = {
      data: { ...this.state.data },
      design: { ...this.state.design },
    };
    if (isValidUrl(url)) {
      this.setState({ isValidUrl: true });
      if (onConfirm) {
        onConfirm({ ...componentData, button: buttonObj });
      } else {
        pubsub.update('componentData', { button: buttonObj });
      }

      this.setState({ isOpen: false });
      closeModal();
      this.setState({ submitted: true });
    } else {
      this.setState({ isValidUrl: false, activeTab: settingsTabValue });
      this.linkInput.scrollIntoView(false);
    }
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onConfirm();
    }
    if (e.charCode === 27) {
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

  onTabSelected = tabValue => {
    const { url } = this.state.data;
    if (!isValidUrl(url) && tabValue === designTabValue) {
      this.setState({ isValidUrl: false });
    }
  };
  render() {
    const { theme, t, uiSettings, doneLabel, cancelLabel, isMobile } = this.props;
    const { styles } = this;
    const settingTabLabel = (
      <div className={styles.settingTab}>
        <div className={styles.tabTitle}>
          <p className={styles.tabLabel}>{t('ButtonModal_Settings_Tab')}</p>
        </div>
        <div className={styles.errorIcon}>
          {!this.state.isValidUrl ? <ErrorIcon width="18" height="18" /> : null}
        </div>
      </div>
    );
    const designTabLabel = <p className={styles.tabLabel}>{t('ButtonModal_Design_Tab')}</p>;
    const settingsComponent = (
      <SettingsComponent
        t={t}
        theme={theme}
        uiSettings={uiSettings}
        {...this.props}
        isValidUrl={this.onValidUrl.bind(this)}
        onSettingsChange={this.onSettingsChanged.bind(this)}
        validUrl={this.state.isValidUrl}
        settingsObj={this.state.data}
        onKeyPress={this.handleKeyPress}
        linkInputRef={ref => {
          this.linkInput = ref;
        }}
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
          <div className={styles.scroll} ref={this.setScrollbarRef}>
            <div className={styles.container} data-hook="ButtonInputModal">
              <div className={styles.header_text}>{t('ButtonModal_Settings_Tab')}</div>
              {settingsComponent}
            </div>
            <div className={styles.separator} />
            <div className={styles.design_component_container} data-hook="ButtonInputModal">
              <div className={styles.design_header_text}>{t('ButtonModal_Design_Tab')}</div>
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
          <div className={styles.container} data-hook="ButtonInputModal">
            <div>
              <div role="heading" aria-labelledby="button_modal_hdr" className={styles.header}>
                <div className={styles.header_text}>{t('ButtonModal_Header')}</div>
              </div>
              <FocusManager>
                <div className={styles.focus_mhanager}>
                  <Tabs
                    value={this.state.activeTab}
                    theme={this.styles}
                    onTabSelected={this.onTabSelected.bind(this)}
                  >
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
                          this.state.isHover ? <div className={styles.scrollbar_thumb} /> : <div />
                        }
                        className={styles.customize_scrollbar_container}
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
              className={styles.modal_footer}
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
