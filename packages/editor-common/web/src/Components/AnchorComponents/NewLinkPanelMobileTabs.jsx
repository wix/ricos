/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import classNames from 'classnames';
import styles from '../../../statics/styles/new-link-panel.scss';

class NewLinkPanelMobileTabs extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }
  render() {
    const { styles } = this;
    const { t, radioGroupValue, changeRadioGroup } = this.props;
    return (
      <div>
        <div className={styles.linkPanel_tabsWrapper}>
          <div
            className={classNames(styles.linkPanel_tab, {
              [styles.linkPanel_tabSelected]: radioGroupValue === 'external-link',
            })}
            onClick={() => changeRadioGroup('external-link')}
            data-hook="linkPanelContainerLinkTab"
          >
            {t('LinkTo_Modal_Sidebar_Website')}
          </div>
          <div
            className={classNames(styles.linkPanel_tab, {
              [styles.linkPanel_tabSelected]: radioGroupValue === 'anchor',
            })}
            onClick={() => changeRadioGroup('anchor')}
            data-hook="linkPanelContainerAnchorTab"
          >
            {t('LinkTo_Modal_Sidebar_Section')}
          </div>
        </div>
      </div>
    );
  }
}

NewLinkPanelMobileTabs.propTypes = {
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  radioGroupValue: PropTypes.string,
  changeRadioGroup: PropTypes.func,
};

export default NewLinkPanelMobileTabs;
