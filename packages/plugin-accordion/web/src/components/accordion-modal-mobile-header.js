import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/accordion-modal-mobile-header.scss';

class AccordionModalMobileHeader extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }
  render() {
    const { save, saveName, cancel, cancelName, t } = this.props;
    const cancelLabel = cancelName || t('ImageSettings_MobileHeader_Cancel'); //for now
    const saveLabel = saveName || t('ImageSettings_MobileHeader_Save'); //for now

    return (
      <div className={this.styles.header}>
        <button
          className={classNames(
            this.styles.accordion_header_button,
            this.styles.accordion_header_button_cancel
          )}
          onClick={cancel}
        >
          {cancelLabel}
        </button>
        <button
          className={classNames(
            this.styles.accordion_header_button,
            this.styles.accordion_header_button_done
          )}
          onClick={save}
        >
          {saveLabel}
        </button>
      </div>
    );
  }
}

AccordionModalMobileHeader.propTypes = {
  save: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  cancel: PropTypes.func.isRequired,
  saveName: PropTypes.string,
  cancelName: PropTypes.string,
  t: PropTypes.func,
};

export default AccordionModalMobileHeader;
