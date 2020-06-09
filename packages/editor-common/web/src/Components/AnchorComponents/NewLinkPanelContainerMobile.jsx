import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LinkPanel from '../LinkComponents/LinkPanel';
import AnchorPanel from '../AnchorPanel';
import FocusManager from '../FocusManager';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../../statics/styles/new-link-panel.scss';
import LinkActionsButtons from '../LinkComponents/LinkActionsButtons';
import { LinkIcon } from '../../Icons';
import NewLinkPanelMobileTabs from './NewLinkPanelMobileTabs';
import { RADIO_GROUP_VALUES } from './consts';

class NewLinkPanelContainerMobile extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { styles } = this;
    const {
      getEditorState,
      setEditorState,
      t,
      ariaProps,
      showTargetBlankCheckbox,
      showRelValueCheckbox,
      sharedProps,
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
        className={styles.newLinkPanel_container}
        data-hook="linkPanelContainer"
        role="form"
        {...ariaProps}
      >
        <LinkActionsButtons {...buttonsProps} />
        <div className={styles.newLinkPanel_header}>
          <LinkIcon className={styles.newLinkPanel_mobileHeaderIcon} />
          <div>{t('LinkTo_Modal_Header')}</div>
        </div>

        <NewLinkPanelMobileTabs
          theme={theme}
          t={t}
          radioGroupValue={radioGroupValue}
          changeRadioGroup={changeRadioGroup}
        />

        <div className={styles.newLinkPanel_content}>
          {radioGroupValue === RADIO_GROUP_VALUES.EXTERNAL_LINK && (
            <div className={styles.newLinkPanel_LinkPanelContainer}>
              <LinkPanel
                linkValues={linkPanelValues}
                onChange={linkPanelValues => onChangeLinkPanel({ linkPanelValues })}
                showTargetBlankCheckbox={showTargetBlankCheckbox}
                showRelValueCheckbox={showRelValueCheckbox}
                {...sharedProps}
              />
            </div>
          )}
          {radioGroupValue === RADIO_GROUP_VALUES.ANCHOR && (
            <AnchorPanel
              anchorableBlocksData={anchorableBlocksData}
              getEditorState={getEditorState}
              setEditorState={setEditorState}
              anchorValues={anchorPanelValues}
              onChange={anchorPanelValues => onChangeAnchorPanel({ anchorPanelValues })}
              {...sharedProps}
            />
          )}
        </div>
      </FocusManager>
    );
  }
}

NewLinkPanelContainerMobile.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  ariaProps: PropTypes.object,
  showTargetBlankCheckbox: PropTypes.bool,
  showRelValueCheckbox: PropTypes.bool,
  sharedProps: PropTypes.object,
  buttonsProps: PropTypes.object,
  radioGroupValue: PropTypes.string,
  changeRadioGroup: PropTypes.func,
  linkPanelValues: PropTypes.object,
  onChangeLinkPanel: PropTypes.func,
  onChangeAnchorPanel: PropTypes.func,
  anchorableBlocksData: PropTypes.object,
  anchorPanelValues: PropTypes.object,
};

export default NewLinkPanelContainerMobile;
