import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LinkPanel from './LinkPanel';
import AnchorPanel from '../AnchorComponents/AnchorPanel';
import FocusManager from '../FocusManager';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../../statics/styles/multi-select-link-panel.scss';
import LinkActionsButtons from './LinkActionsButtons';
import { LinkIcon } from '../../Icons';
import MultiSelectLinkPanelMobileTabs from './MultiSelectLinkPanelMobileTabs';
import { RADIO_GROUP_VALUES } from '../AnchorComponents/consts';

class MultiSelectLinkPanelMobile extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { styles } = this;
    const {
      t,
      ariaProps,
      showTargetBlankCheckbox,
      showRelValueCheckbox,
      sharedPanelsProps,
      buttonsProps,
      radioGroupValue,
      theme,
      changeRadioGroup,
      linkPanelValues,
      onChangeLinkPanel,
      onChangeAnchorPanel,
      anchorableBlocksData,
      anchorPanelValues,
    } = this.props;

    return (
      <FocusManager
        className={styles.multiSelectLinkPanel_container}
        data-hook="linkPanelContainer"
        role="form"
        {...ariaProps}
      >
        <LinkActionsButtons {...buttonsProps} />
        <div className={styles.multiSelectLinkPanel_header}>
          <LinkIcon className={styles.multiSelectLinkPanel_mobileHeaderIcon} />
          <div>{t('LinkTo_Modal_Header')}</div>
        </div>

        <MultiSelectLinkPanelMobileTabs
          theme={theme}
          t={t}
          radioGroupValue={radioGroupValue}
          changeRadioGroup={changeRadioGroup}
        />

        <div className={styles.multiSelectLinkPanel_content}>
          {radioGroupValue === RADIO_GROUP_VALUES.EXTERNAL_LINK && (
            <div className={styles.multiSelectLinkPanel_LinkPanelContainer}>
              <LinkPanel
                linkValues={linkPanelValues}
                onChange={linkPanelValues => onChangeLinkPanel({ linkPanelValues })}
                showTargetBlankCheckbox={showTargetBlankCheckbox}
                showRelValueCheckbox={showRelValueCheckbox}
                {...sharedPanelsProps}
              />
            </div>
          )}
          {radioGroupValue === RADIO_GROUP_VALUES.ANCHOR && (
            <AnchorPanel
              anchorableBlocksData={anchorableBlocksData}
              anchorValues={anchorPanelValues}
              onChange={anchorPanelValues => onChangeAnchorPanel({ anchorPanelValues })}
              {...sharedPanelsProps}
            />
          )}
        </div>
      </FocusManager>
    );
  }
}

MultiSelectLinkPanelMobile.propTypes = {
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  ariaProps: PropTypes.object,
  showTargetBlankCheckbox: PropTypes.bool,
  showRelValueCheckbox: PropTypes.bool,
  sharedPanelsProps: PropTypes.object,
  buttonsProps: PropTypes.object,
  radioGroupValue: PropTypes.string,
  changeRadioGroup: PropTypes.func,
  linkPanelValues: PropTypes.object,
  onChangeLinkPanel: PropTypes.func,
  onChangeAnchorPanel: PropTypes.func,
  anchorableBlocksData: PropTypes.object,
  anchorPanelValues: PropTypes.object,
};

export default MultiSelectLinkPanelMobile;
