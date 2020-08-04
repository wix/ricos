import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/accordion-modal-mobile-header.scss';

class AccordionModalMobileHeader extends Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.cancelLabel = t('SettingsPanelFooter_Save');
    this.saveLabel = t('SettingsPanelFooter_Cancel');
  }
  render() {
    const { onCancel, onSave } = this.props;

    return (
      <div className={this.styles.header}>
        <button
          className={classNames(
            this.styles.accordion_header_button,
            this.styles.accordion_header_button_cancel
          )}
          onClick={onCancel}
        >
          {this.cancelLabel}
        </button>
        <button
          className={classNames(
            this.styles.accordion_header_button,
            this.styles.accordion_header_button_done
          )}
          onClick={onSave}
        >
          {this.saveLabel}
        </button>
      </div>
    );
  }
}

AccordionModalMobileHeader.propTypes = {
  onSave: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  t: PropTypes.func,
};

export default AccordionModalMobileHeader;
