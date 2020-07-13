import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import ReactModal from 'react-modal';

import {
  SettingsPanelFooter,
  Tabs,
  Tab,
  FocusManager,
  Separator,
} from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';

import { PollContextProvider } from '../poll-context';
import { RCEHelpersContext } from '../rce-helpers-context';

import { TABS } from './constants';

import { DesignSettingsSection } from './design-settings-section';
import { LayoutSettingsSection } from './layout-settings-section';
import { PollSettingsSection } from './poll-settings-section';
import { EditPollSection } from './edit-poll-section';
import { PollViewer } from '../PollViewer';

import styles from './poll-settings-modal.scss';

export class SettingsModal extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    componentData: PropTypes.object.isRequired,
    helpers: PropTypes.object.isRequired,
    pubsub: PropTypes.any.isRequired,
    isMobile: PropTypes.bool,
    theme: PropTypes.object.isRequired,
    t: PropTypes.func,
    relValue: PropTypes.string,
    anchorTarget: PropTypes.string,
    languageDir: PropTypes.string,
  };

  static defaultProps = {
    activeTab: TABS.LAYOUT,
  };

  state = {
    activeTab: this.props.activeTab,
    componentData: this.props.componentData,
    $container: React.createRef(),
    isPreviewOpen: false,
  };

  styles = mergeStyles({ styles, theme: this.props.theme });

  setPoll = poll => {
    const { pubsub } = this.props;

    const componentData = pubsub.store.get('componentData');

    pubsub.store.set('componentData', {
      ...componentData,
      poll,
    });
  };

  componentDidCatch() {}

  handleTabChange = activeTab => this.setState({ activeTab });

  getContainer = () => this.state.$container.current;

  closePreview = () => this.setState({ isPreviewOpen: false });

  openPreview = () => this.setState({ isPreviewOpen: true });

  restoreChanges = () => {
    const { pubsub, helpers } = this.props;
    const { componentData } = this.state;

    pubsub.set('componentData', componentData);

    helpers.closeModal();
  };

  componentDidMount() {
    this.props.pubsub.subscribe('componentData', this.onComponentUpdate);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('componentData', this.onComponentUpdate);
  }

  onComponentUpdate = () => this.forceUpdate();

  render() {
    const { activeTab, $container, isPreviewOpen } = this.state;
    const { pubsub, helpers, t, languageDir, theme, isMobile } = this.props;

    const componentData = pubsub.store.get('componentData');

    return (
      <div ref={$container}>
        <FocusManager dir={languageDir}>
          {isMobile ? (
            <div className={this.styles.header}>
              <button
                className={cls(
                  this.styles.poll_header_button,
                  this.styles.poll_header_button_secondary
                )}
                onClick={this.restoreChanges}
              >
                {t('Poll_PollSettings_Common_CTA_Secondary')}
              </button>
              <div className={this.styles.header_button_list}>
                <button
                  className={cls(
                    this.styles.poll_header_button,
                    this.styles.poll_header_button_primary
                  )}
                  onClick={this.openPreview}
                >
                  {t('Poll_FormatToolbar_Preview_Tooltip')}
                </button>
                <Separator className={this.styles.separator_vertical} />
                <button
                  className={cls(
                    this.styles.poll_header_button,
                    this.styles.poll_header_button_primary
                  )}
                  onClick={helpers.closeModal}
                >
                  {t('Poll_PollSettings_Common_CTA_Primary')}
                </button>
              </div>
            </div>
          ) : (
            <div className={this.styles.header}>
              <h3 className={this.styles.title}>{t('Poll_PollSettings_Common_Header')}</h3>
            </div>
          )}

          {activeTab === TABS.EDIT ? (
            <RCEHelpersContext.Provider
              value={{
                layout: componentData.layout,
                design: componentData.design,
                helpers,
                theme,
                t,
                isMobile,
              }}
            >
              <PollContextProvider
                settings={{}}
                poll={componentData.poll}
                setPoll={this.setPoll}
                t={t}
              >
                <EditPollSection store={pubsub.store} />
              </PollContextProvider>
            </RCEHelpersContext.Provider>
          ) : (
            <Tabs value={activeTab} theme={theme} onTabSelected={this.handleTabChange}>
              <Tab
                label={t('Poll_PollSettings_Tab_Layout_TabName')}
                value={TABS.LAYOUT}
                theme={theme}
              >
                <LayoutSettingsSection
                  theme={theme}
                  store={pubsub.store}
                  componentData={componentData}
                  t={t}
                  isMobile={isMobile}
                />
              </Tab>
              <Tab
                label={t('Poll_PollSettings_Tab_Design_TabName')}
                value={TABS.DESIGN}
                theme={theme}
              >
                <DesignSettingsSection
                  theme={theme}
                  store={pubsub.store}
                  componentData={componentData}
                  t={t}
                />
              </Tab>
              <Tab
                label={t('Poll_PollSettings_Tab_Settings_TabName')}
                value={TABS.SETTINGS}
                theme={theme}
              >
                <PollSettingsSection
                  theme={theme}
                  store={pubsub.store}
                  componentData={componentData}
                  t={t}
                  isMobile={isMobile}
                />
              </Tab>
            </Tabs>
          )}

          {!isMobile && (
            <SettingsPanelFooter
              fixed
              cancel={this.restoreChanges}
              save={helpers.closeModal}
              theme={this.props.theme}
              t={t}
            />
          )}

          {isMobile && $container.current && (
            <ReactModal
              isOpen={isPreviewOpen}
              onRequestClose={this.closePreview}
              parentSelector={this.getContainer}
              className={cls(this.styles.modal)}
              overlayClassName={cls(this.styles.overlay)}
            >
              <PollViewer
                isMobile
                settings={{
                  isPreview: true,
                  preventInteraction: true,
                }}
                componentData={componentData}
                onRequestClose={this.closePreview}
                theme={theme}
                t={t}
              />
              &nbsp;
              <button
                className={cls(
                  this.styles.poll_header_button,
                  this.styles.poll_header_button_primary
                )}
                onClick={this.closePreview}
              >
                {t('Poll_Preview_Close_CTA')}
              </button>
            </ReactModal>
          )}
        </FocusManager>
      </div>
    );
  }
}
