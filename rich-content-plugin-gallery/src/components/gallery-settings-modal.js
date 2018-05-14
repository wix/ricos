import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  mergeStyles,
  SettingsPanelFooter,
  SettingsSection,
  Tabs,
  Tab,
  FocusManager
} from 'wix-rich-content-common';
import LayoutSelector from './gallery-controls/layouts-selector';
import styles from './gallery-settings-modal.scss';
import LayoutControlsSection from './layout-controls-section';
import { SortableComponent } from './gallery-controls/gallery-items-sortable';
import layoutData from '../helpers/layout-data-provider';
import GallerySettingsMobileHeader from './gallery-controls/gallery-settings-mobile-header';

class ManageMediaSection extends Component {

  applyItems = items => {
    const { data, store } = this.props;
    const componentData = { ...data, items };
    store.set('componentData', componentData);
  };

  handleFileChange = (event, itemPos) => {
    if (event.target.files.length > 0) {
      const handleFilesSelected = this.props.store.get('handleFilesSelected');
      handleFilesSelected(event.target.files, itemPos);
    }
    event.target.value = ''; //reset the input
  };

  render() {
    const { helpers, store, t } = this.props;
    const { handleFileSelection } = helpers;

    return (
      <div>
        <SortableComponent
          theme={this.props.theme}
          items={this.props.data.items}
          onItemsChange={this.applyItems}
          handleFileChange={this.handleFileChange}
          handleFileSelection={handleFileSelection}
          handleFilesAdded={store.get('handleFilesAdded')}
          deleteBlock={store.get('deleteBlock')}
          t={t}
          isMobile={this.props.isMobile}
        />
      </div>
    );
  }
}

ManageMediaSection.propTypes = {
  data: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  t: PropTypes.func,
};

class AdvancedSettingsSection extends Component {
  applyGallerySetting = setting => {
    const { data, store } = this.props;
    const componentData = {
      ...data,
      styles: Object.assign({}, data.styles, setting)
    };
    store.set('componentData', componentData);
  };

  switchLayout = layout => {
    const layoutStyles = Object.assign(
      {},
      layout,
      layoutData[layout.galleryLayout]
    );
    this.applyGallerySetting(layoutStyles);
  };

  getValueFromComponentStyles = name => this.props.data.styles[name];

  shouldRender() {
    const { data } = this.props;
    return data && data.styles;
  }

  render() {
    const { data, store, theme, t, isMobile } = this.props;
    return this.shouldRender() && (
      <div className={isMobile ? styles.gallerySettings_settingsContainerMobile : styles.gallerySettings_settingsContainer}>
        <SettingsSection theme={theme}>
          <LayoutSelector
            theme={theme}
            value={this.getValueFromComponentStyles('galleryLayout')}
            onChange={value => this.switchLayout({ galleryLayout: value })}
            t={t}
            isMobile={isMobile}
          />
        </SettingsSection>
        <LayoutControlsSection
          theme={theme}
          layout={this.getValueFromComponentStyles('galleryLayout')}
          data={data}
          store={store}
          t={t}
          isMobile={isMobile}
        />
      </div>
    );
  }
}

AdvancedSettingsSection.propTypes = {
  data: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
};

export class GallerySettingsModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.activeTab
    };
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.switchTab = this.switchTab.bind(this);
  }

  componentDidMount() {
    this.props.pubsub.subscribe('componentData', this.onComponentUpdate);
    this.setState({
      initComponentData: this.props.pubsub.get('componentData')
    });
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('componentData', this.onComponentUpdate);
  }

  onComponentUpdate = () => this.forceUpdate();

  revertComponentData = () => {
    const { pubsub, helpers } = this.props;
    if (this.state.initComponentData) {
      pubsub.set('componentData', this.state.initComponentData);
    }

    helpers.closeModal();
  };

  otherTab() {
    return this.state.activeTab === 'manage_media' ? 'advanced_settings' : 'manage_media';
  }

  switchTab() {
    const otherTab = this.otherTab();
    this.setState({ activeTab: otherTab });
  }

  tabName(tab, t) {
    /* eslint-disable camelcase */
    return {
      manage_media: t('GallerySettings_Tab_ManageMedia'),
      advanced_settings: t('GallerySettings_Tab_AdvancedSettings'),
    }[tab];
  }

  render() {
    const styles = this.styles;
    const { pubsub, helpers, t, isMobile } = this.props;
    const { activeTab } = this.state;
    const componentData = pubsub.get('componentData');
    // console.log('MODAL_RENDER: ', componentData);

    if (isMobile) {
      // console.log('Rendering mobile settings');
      /* eslint-disable max-len */
      return (
        <div>
          <GallerySettingsMobileHeader
            theme={this.props.theme}
            cancel={() => this.revertComponentData()}
            save={() => helpers.closeModal()}
            switchTab={this.switchTab}
            otherTab={this.tabName(this.otherTab(), t)}
            t={t}
          />
          {activeTab === 'manage_media' ? <ManageMediaSection data={componentData} store={pubsub.store} theme={this.props.theme} helpers={helpers} t={t} isMobile/> : null }
          {activeTab === 'advanced_settings' ? <AdvancedSettingsSection theme={this.props.theme} data={componentData} store={pubsub.store} helpers={helpers} t={t} isMobile/> : null }
        </div>
      );
    } else {
      const headerText = t('GallerySettings_Header');
      return (
        <FocusManager focusTrapOptions={{ initialFocus: `#${activeTab}` }} className={styles.gallerySettings}>
          <h3 className={styles.gallerySettings_title}>{headerText}</h3>
          <div>
            <Tabs value={activeTab} theme={this.props.theme}>
              <Tab label={this.tabName('manage_media', t)} value={'manage_media'} theme={this.props.theme}>
                <ManageMediaSection data={componentData} store={pubsub.store} helpers={helpers} theme={this.props.theme} t={t}/>
              </Tab>
              <Tab label={this.tabName('advanced_settings', t)} value={'advanced_settings'} theme={this.props.theme}>
                <AdvancedSettingsSection theme={this.props.theme} data={componentData} store={pubsub.store} helpers={helpers} t={t}/>
              </Tab>
            </Tabs>
          </div>
          <SettingsPanelFooter fixed cancel={() => this.revertComponentData()} save={() => helpers.closeModal()} theme={this.props.theme} t={t}/>
        </FocusManager>
      );
    }
  }
}

GallerySettingsModal.propTypes = {
  activeTab: PropTypes.oneOf(['manage_media', 'advanced_settings']),
  componentData: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired,
  pubsub: PropTypes.any.isRequired,
  isMobile: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
};

export default GallerySettingsModal;
