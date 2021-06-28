import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import { CollapsibleList } from '../domain/collapsibleList';
import { SettingsPanelFooter } from 'wix-rich-content-ui-components';
import CollapsibleListSettings from './CollapsibleListSettings';
import CollapsibleListMobileHeader from './CollapsibleListMobileHeader';
import styles from '../../../statics/styles/collapsible-list-modal.scss';

class CollapsibleListModal extends Component {
  constructor(props) {
    super(props);
    this.state = this.initState(props);
    const { theme } = props;
    this.styles = mergeStyles({ styles, theme });
  }

  initState(props) {
    return { initialComponentData: props.pubsub.get('componentData') };
  }

  componentDidMount() {
    const { pubsub } = this.props;
    pubsub.subscribe('componentData', this.onComponentUpdate);
    this.setState({ initialComponentData: pubsub.get('componentData') });
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('componentData', this.onComponentUpdate);
  }

  onComponentUpdate = () => this.forceUpdate();

  revertComponentData = () => {
    const { helpers } = this.props;
    const { initialComponentData } = this.state;
    if (initialComponentData) {
      this.getDataManager().updateData(initialComponentData);
    }

    helpers.closeModal();
  };

  onDoneClick = () => {
    const { helpers } = this.props;
    helpers.closeModal();
  };

  getDataManager = () => {
    const { pubsub } = this.props;
    return new CollapsibleList(pubsub.store, pubsub.get('componentData'));
  };

  renderDesktopHeader = () => {
    const { t } = this.props;

    return (
      <h3 className={this.styles.collapsibleListModalTitle}>
        {t('CollapsibleList_CollapsibleListSettings_Common_Header')}
      </h3>
    );
  };

  renderMobileHeader = () => {
    const { t, theme } = this.props;

    return (
      <CollapsibleListMobileHeader
        t={t}
        theme={theme}
        onCancel={this.revertComponentData}
        onSave={this.onDoneClick}
      />
    );
  };

  renderSettings = () => {
    const { isMobile, theme, t } = this.props;

    return (
      <div
        className={classNames(styles.collapsibleListModal_scrollContainer, {
          [styles.collapsibleListModal_mobile]: isMobile,
        })}
      >
        <CollapsibleListSettings
          getDataManager={this.getDataManager}
          theme={theme}
          isMobile={isMobile}
          t={t}
        />
      </div>
    );
  };

  renderDesktopFooterPanel = () => {
    const { theme, t } = this.props;

    return (
      <SettingsPanelFooter
        fixed
        theme={theme}
        cancel={this.revertComponentData}
        save={this.onDoneClick}
        t={t}
      />
    );
  };

  render() {
    const { isMobile, languageDir } = this.props;

    return (
      <div
        className={this.styles.collapsibleListModal}
        data-hook="collapsibleListModal"
        dir={languageDir}
      >
        {isMobile ? this.renderMobileHeader() : this.renderDesktopHeader()}
        {this.renderSettings()}
        {!isMobile && this.renderDesktopFooterPanel()}
      </div>
    );
  }
}
CollapsibleListModal.propTypes = {
  helpers: PropTypes.object,
  theme: PropTypes.object.isRequired,
  pubsub: PropTypes.any,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  languageDir: PropTypes.string,
};

export default CollapsibleListModal;
