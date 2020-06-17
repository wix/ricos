/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import classNames from 'classnames';
import styles from '../../../statics/styles/multi-select-link-panel.scss';
import { RADIO_GROUP_VALUES } from '../AnchorComponents/consts';

class MultiSelectLinkPanelMobileTabs extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }
  render() {
    const { styles } = this;
    const { t, radioGroupValue, changeRadioGroup } = this.props;
    return (
      <div className={styles.multiSelectLinkPanel_tabsWrapper}>
        <div
          className={classNames(styles.multiSelectLinkPanel_tab, {
            [styles.multiSelectLinkPanel_tabSelected]:
              radioGroupValue === RADIO_GROUP_VALUES.EXTERNAL_LINK,
          })}
          onClick={() => changeRadioGroup(RADIO_GROUP_VALUES.EXTERNAL_LINK)}
          data-hook="linkPanelContainerLinkTab"
        >
          {t('LinkTo_Modal_Sidebar_Website')}
        </div>
        <div
          className={classNames(styles.multiSelectLinkPanel_tab, {
            [styles.multiSelectLinkPanel_tabSelected]:
              radioGroupValue === RADIO_GROUP_VALUES.ANCHOR,
          })}
          onClick={() => changeRadioGroup(RADIO_GROUP_VALUES.ANCHOR)}
          data-hook="linkPanelContainerAnchorTab"
        >
          {t('LinkTo_Modal_Sidebar_Section')}
        </div>
      </div>
    );
  }
}

MultiSelectLinkPanelMobileTabs.propTypes = {
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  radioGroupValue: PropTypes.string,
  changeRadioGroup: PropTypes.func,
};

export default MultiSelectLinkPanelMobileTabs;
