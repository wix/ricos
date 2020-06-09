import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LinkPanel from '../LinkComponents/LinkPanel';
import AnchorPanel from '../AnchorPanel';
import FocusManager from '../FocusManager';
import { mergeStyles } from 'wix-rich-content-common';
import RadioGroup from '../RadioGroup';
import styles from '../../../statics/styles/new-link-panel.scss';
import LinkActionsButtons from '../LinkComponents/LinkActionsButtons';

class NewLinkPanelContainerDesktop extends PureComponent {
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
      changeRadioGroup,
      linkPanelValues,
      onChangeLinkPanel,
      onChangeAnchorPanel,
      anchorableBlocksData,
      anchorPanelValues,
    } = this.props;

    return (
      <FocusManager
        className={styles.linkPanel_container}
        data-hook="linkPanelContainer"
        role="form"
        {...ariaProps}
      >
        <div className={styles.linkPanel_header}>
          <div>{t('LinkTo_Modal_Header')}</div>
        </div>
        <div className={styles.linkPanel_actionsDivider} role="separator" />
        <div className={styles.linkPanel_content}>
          <RadioGroup
            className={styles.linkPanel_radioButtons}
            dataSource={[
              {
                value: 'external-link',
                labelText: t('LinkTo_Modal_Sidebar_Website'),
                dataHook: 'link-radio',
              },
              {
                value: 'anchor',
                labelText: t('LinkTo_Modal_Sidebar_Section'),
                dataHook: 'anchor-radio',
              },
            ]}
            value={radioGroupValue}
            onChange={changeRadioGroup}
            {...this.props}
          />

          <div className={styles.linkPanel_VerticalDivider} />
          {radioGroupValue === 'external-link' && (
            <LinkPanel
              linkValues={linkPanelValues}
              onChange={linkPanelValues => onChangeLinkPanel({ linkPanelValues })}
              showTargetBlankCheckbox={showTargetBlankCheckbox}
              showRelValueCheckbox={showRelValueCheckbox}
              {...sharedProps}
            />
          )}
          {radioGroupValue === 'anchor' && (
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
        <div className={styles.linkPanel_actionsDivider} role="separator" />
        <LinkActionsButtons {...buttonsProps} />
      </FocusManager>
    );
  }
}

NewLinkPanelContainerDesktop.propTypes = {
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

export default NewLinkPanelContainerDesktop;
