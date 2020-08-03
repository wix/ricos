import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import {
  SettingsPanelFooter,
  // SettingsSection,
  FocusManager,
  Tabs,
  Tab,
} from 'wix-rich-content-editor-common';
import { TABS } from '../defaults';
import AccordionSettings from './accordion-settings';
import AccordionModalMobileHeader from './accordion-modal-mobile-header';
import styles from '../../statics/styles/accordion-modal.scss';

class AccordionModal extends Component {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
    this.initialState = { ...this.state };
    const { t, theme } = props;
    this.styles = mergeStyles({ styles, theme });
    this.headerText = t('Accordion_AccordionSettings_Common_Header');
  }

  stateFromProps(props) {
    return { ...props };
  }

  componentDidMount() {
    this.props.pubsub.subscribe('componentData', this.onComponentUpdate);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('componentData', this.onComponentUpdate);
  }

  onComponentUpdate = () => {
    // this.setState({ this.props.pubsub.get('componentData') });
  };

  revertComponentData() {
    const { componentData, helpers, pubsub } = this.props;
    if (this.initialState) {
      const initialComponentData = { ...componentData, ...this.initialState };
      pubsub.update('componentData', initialComponentData);
      this.setState({ ...this.initialState });
    }
    helpers.closeModal();
  }

  onDoneClick = () => {
    const { helpers } = this.props;
    helpers.closeModal();
  };

  render() {
    const { theme, t, isMobile, languageDir, activeTab } = this.props;

    return (
      <div className={this.styles.accordionModal} data-hook="accordionModal" dir={languageDir}>
        {isMobile ? (
          <AccordionModalMobileHeader
            t={t}
            theme={theme}
            cancel={() => this.revertComponentData()}
            save={() => this.onDoneClick()}
          />
        ) : (
          <h3 className={this.styles.accordionModalTitle}>{this.headerText}</h3>
        )}
        <div
          className={classNames(styles.accordionModal_scrollContainer, {
            [styles.accordionModal_mobile]: isMobile,
          })}
        >
          <FocusManager
            focusTrapOptions={{ initialFocus: activeTab }}
            className={styles.accordionModal}
            dir={languageDir}
          >
            <Tabs value={activeTab} theme={this.props.theme} /*onTabSelected={this.onTabSelected}*/>
              <Tab
                label={t('Accordion_AccordionSettings_Tab_Settings_TabName')}
                value={TABS.SETTINGS}
                theme={this.props.theme}
              >
                <AccordionSettings {...this.props} />
              </Tab>
              <Tab
                label={t('Accordion_AccordionSettings_Tab_Design_TabName')}
                value={TABS.DESIGN}
                theme={this.props.theme}
              />
            </Tabs>
          </FocusManager>
          );
        </div>
        {isMobile ? null : (
          <SettingsPanelFooter
            fixed
            theme={theme}
            cancel={() => this.revertComponentData()}
            save={() => this.onDoneClick()}
            t={t}
          />
        )}
      </div>
    );
  }
}
AccordionModal.propTypes = {
  componentData: PropTypes.any.isRequired,
  helpers: PropTypes.object,
  theme: PropTypes.object.isRequired,
  pubsub: PropTypes.any,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  languageDir: PropTypes.string,
  activeTab: PropTypes.string,
};

export default AccordionModal;
