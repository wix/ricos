import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import {
  RadioGroupVertical,
  SelectionList,
  Separator,
  LabeledToggle,
  InfoIcon,
} from 'wix-rich-content-ui-components';
import { LTRIcon, RTLIcon } from 'wix-rich-content-plugin-commons';
import { directions, EXPANDED, COLLAPSED, FIRST_EXPANDED } from '../../defaults';
import styles from '../../../statics/styles/collapsible-list-settings.scss';

class CollapsibleListSettings extends Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.styles = mergeStyles({ styles, theme });
  }

  renderOption = ({ item }) => (
    <>
      <item.icon />
      <p>{item.label}</p>
    </>
  );

  renderExpandOptions = () => {
    const { getDataManager, t, theme, isMobile } = this.props;

    return (
      <>
        <RadioGroupVertical
          label={t('CollapsibleList_CollapsibleListSettings_Tab_Settings_CollapseView_Title')}
          value={getDataManager().getExpandState()}
          dataSource={[
            {
              value: EXPANDED,
              labelText: t(
                'CollapsibleList_CollapsibleListSettings_Tab_Settings_CollapseView_Expanded'
              ),
              dataHook: 'Expanded',
            },
            {
              value: FIRST_EXPANDED,
              labelText: t(
                'CollapsibleList_CollapsibleListSettings_Tab_Settings_CollapseView_FirstExpanded'
              ),
              dataHook: 'FirstExpanded',
            },
            {
              value: COLLAPSED,
              labelText: t(
                'CollapsibleList_CollapsibleListSettings_Tab_Settings_CollapseView_Collapsed'
              ),
              dataHook: 'Collapsed',
            },
          ]}
          t={t}
          theme={theme}
          onChange={value => getDataManager().setExpandState(value)}
        />
        {getDataManager().getExpandState() !== EXPANDED && (
          <LabeledToggle
            label={t(
              'CollapsibleList_CollapsibleListSettings_Tab_Settings_CollapseView_InSections'
            )}
            checked={getDataManager().getExpandOnlyOne()}
            onChange={getDataManager().toggleExpandOnlyOne}
            theme={theme}
            style={isMobile ? { paddingTop: '28px' } : {}}
            dataHook={'onePairExpanded'}
          />
        )}
      </>
    );
  };

  renderSeparator = () => <Separator horizontal className={this.styles.separator} />;

  renderDirectionOptions = () => {
    const { getDataManager, t } = this.props;

    return (
      <>
        <p className={this.styles.title}>
          {t('CollapsibleList_CollapsibleListSettings_Tab_Settings_Direction_Title')}
          &nbsp;
          <InfoIcon
            tooltipText={t(
              'CollapsibleList_CollapsibleListSettings_Tab_Settings_Direction_Title_Tooltip'
            )}
          />
        </p>
        <SelectionList
          theme={this.styles}
          dataSource={[
            {
              value: directions.LTR,
              label: t('CollapsibleList_CollapsibleListSettings_Tab_Settings_Direction_LTR'),
              icon: LTRIcon,
              dataHook: 'ltrDirection',
            },
            {
              value: directions.RTL,
              label: t('CollapsibleList_CollapsibleListSettings_Tab_Settings_Direction_RTL'),
              icon: RTLIcon,
              dataHook: 'rtlDirection',
            },
          ]}
          renderItem={this.renderOption}
          value={getDataManager().getDirection()}
          onChange={getDataManager().changeDirection}
          className={this.styles.direction_selector}
          optionClassName={this.styles.direction_selector_option}
        />
      </>
    );
  };

  render() {
    return (
      <div className={this.styles.settingsContainer}>
        {this.renderExpandOptions()}
        {this.renderSeparator()}
        {this.renderDirectionOptions()}
      </div>
    );
  }
}

CollapsibleListSettings.propTypes = {
  getDataManager: PropTypes.any.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
};

export default CollapsibleListSettings;
