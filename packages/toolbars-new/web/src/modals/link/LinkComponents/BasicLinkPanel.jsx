import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LinkPanel from './LinkPanel';
import FocusManager from '../FocusManager';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../../statics/styles/link-panel.scss';
import LinkActionsButtons from './LinkActionsButtons';
import { LinkIcon } from '../../Icons';

class BasicLinkPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  renderMobileTitle = () => {
    const { t } = this.props;
    return (
      <div className={styles.mobileLinkModal_titleContainer}>
        <div className={styles.mobileLinkModal_linkIconContainer}>
          <LinkIcon />
        </div>
        <h3 id="mob_link_modal_hdr" className={styles.mobileLinkModal_title}>
          {t('MobileLinkModal_Title')}
        </h3>
      </div>
    );
  };

  render() {
    const { styles } = this;
    const {
      ariaProps,
      showTargetBlankCheckbox,
      showRelValueCheckbox,
      sharedPanelsProps,
      buttonsProps,
      linkPanelValues,
      onChangeLinkPanel,
      isMobile,
      linkPanelWithTitle,
    } = this.props;
    const linkPanelContainerClassName = classNames(styles.linkPanel_container, {
      [styles.linkPanel_container_isMobile]: isMobile,
    });
    return (
      <FocusManager
        className={linkPanelContainerClassName}
        data-hook="linkPanelContainer"
        role="form"
        {...ariaProps}
      >
        {isMobile && linkPanelWithTitle && this.renderMobileTitle()}
        <div className={styles.linkPanel_content}>
          <LinkPanel
            linkValues={linkPanelValues}
            onChange={linkPanelValues => onChangeLinkPanel({ linkPanelValues })}
            showTargetBlankCheckbox={showTargetBlankCheckbox}
            showRelValueCheckbox={showRelValueCheckbox}
            {...sharedPanelsProps}
          />
          <div className={styles.linkPanel_actionsDivider} role="separator" />
        </div>
        <LinkActionsButtons basicLinkPanel {...buttonsProps} />
      </FocusManager>
    );
  }
}

BasicLinkPanel.propTypes = {
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  ariaProps: PropTypes.object,
  showTargetBlankCheckbox: PropTypes.bool,
  showRelValueCheckbox: PropTypes.bool,
  sharedPanelsProps: PropTypes.object,
  buttonsProps: PropTypes.object,
  changeRadioGroup: PropTypes.func,
  linkPanelValues: PropTypes.object,
  onChangeLinkPanel: PropTypes.func,
  isMobile: PropTypes.bool,
  linkPanelWithTitle: PropTypes.bool,
};

export default BasicLinkPanel;
