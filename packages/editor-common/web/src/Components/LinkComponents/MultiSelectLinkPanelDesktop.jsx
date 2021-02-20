import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LinkPanel from './LinkPanel';
import AnchorPanel from '../AnchorComponents/AnchorPanel';
import FocusManager from '../FocusManager';
import { mergeStyles } from 'wix-rich-content-common';
import RadioGroup from '../RadioGroup';
import styles from '../../../statics/styles/multi-select-link-panel.scss';
import LinkActionsButtons from './LinkActionsButtons';
import { RADIO_GROUP_VALUES } from '../AnchorComponents/consts';

class MultiSelectLinkPanelDesktop extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  renderRadioGroup = () => {
    const { radioGroupValue, changeRadioGroup, t } = this.props;
    return (
      <RadioGroup
        className={styles.multiSelectLinkPanel_radioButtons}
        dataSource={[
          {
            value: RADIO_GROUP_VALUES.EXTERNAL_LINK,
            labelText: t('LinkTo_Modal_Sidebar_Website'),
            dataHook: 'link-radio',
          },
          {
            value: RADIO_GROUP_VALUES.ANCHOR,
            labelText: t('LinkTo_Modal_Sidebar_Section'),
            dataHook: 'anchor-radio',
          },
        ]}
        value={radioGroupValue}
        onChange={changeRadioGroup}
        {...this.props}
      />
    );
  };

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
        <div className={styles.multiSelectLinkPanel_header}>
          <div>{t('LinkTo_Modal_Header')}</div>
        </div>
        <div className={styles.multiSelectLinkPanel_actionsDivider} role="separator" />
        <div className={styles.multiSelectLinkPanel_content}>
          {this.renderRadioGroup()}
          <div className={styles.linkPanel_VerticalDivider} />
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
        <div className={styles.multiSelectLinkPanel_actionsDivider} role="separator" />
        <LinkActionsButtons {...buttonsProps} />
      </FocusManager>
    );
  }
}

MultiSelectLinkPanelDesktop.propTypes = {
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

export default MultiSelectLinkPanelDesktop;
