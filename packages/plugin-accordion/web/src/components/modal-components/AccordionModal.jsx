import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import { Accordion } from '../domain/accordion';
import { SettingsPanelFooter } from 'wix-rich-content-plugin-commons';
import AccordionSettings from './AccordionSettings';
import AccordionMobileHeader from './AccordionMobileHeader';
import styles from '../../../statics/styles/accordion-modal.scss';

class AccordionModal extends Component {
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
    return new Accordion(pubsub.store, pubsub.get('componentData'));
  };

  renderDesktopHeader = () => {
    const { t } = this.props;

    return (
      <h3 className={this.styles.accordionModalTitle}>
        {t('Accordion_AccordionSettings_Common_Header')}
      </h3>
    );
  };

  renderMobileHeader = () => {
    const { t, theme } = this.props;

    return (
      <AccordionMobileHeader
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
        className={classNames(styles.accordionModal_scrollContainer, {
          [styles.accordionModal_mobile]: isMobile,
        })}
      >
        <AccordionSettings
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
      <div className={this.styles.accordionModal} data-hook="accordionModal" dir={languageDir}>
        {isMobile ? this.renderMobileHeader() : this.renderDesktopHeader()}
        {this.renderSettings()}
        {!isMobile && this.renderDesktopFooterPanel()}
      </div>
    );
  }
}
AccordionModal.propTypes = {
  helpers: PropTypes.object,
  theme: PropTypes.object.isRequired,
  pubsub: PropTypes.any,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  languageDir: PropTypes.string,
};

export default AccordionModal;
