import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import { Separator, InfoIcon } from 'wix-rich-content-editor-common';
import { RadioGroupVertical, SelectionList, LabeledToggle } from 'wix-rich-content-plugin-commons';
import { LTRIcon, RTLIcon } from '../../icons';
import { directions, EXPANDED, COLLAPSED, FIRST_EXPANDED } from '../../defaults';
import styles from '../../../statics/styles/accordion-settings.scss';

class AccordionSettings extends Component {
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
          label={t('Accordion_AccordionSettings_Tab_Settings_CollapseView_Title')}
          value={getDataManager().getExpandState()}
          dataSource={[
            {
              value: COLLAPSED,
              labelText: t('Accordion_AccordionSettings_Tab_Settings_CollapseView_Collapsed'),
              dataHook: 'radioGroupCollapsed',
            },
            {
              value: FIRST_EXPANDED,
              labelText: t('Accordion_AccordionSettings_Tab_Settings_CollapseView_FirstExpanded'),
              dataHook: 'radioGroupFirstExpanded',
            },
            {
              value: EXPANDED,
              labelText: t('Accordion_AccordionSettings_Tab_Settings_CollapseView_Expanded'),
              dataHook: 'radioGroupExpanded',
            },
          ]}
          t={t}
          theme={theme}
          onChange={value => getDataManager().setExpandState(value)}
        />
        {getDataManager().getExpandState() !== EXPANDED && (
          <LabeledToggle
            label={t('Accordion_AccordionSettings_Tab_Settings_CollapseView_InSections')}
            checked={getDataManager().getExpandOnlyOne()}
            onChange={getDataManager().changeExpandOnlyOne}
            theme={theme}
            style={isMobile ? { paddingTop: '28px' } : {}}
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
        <p>
          {t('Accordion_AccordionSettings_Tab_Settings_Direction_Title')}
          &nbsp;
          <InfoIcon
            tooltipText={t('Accordion_AccordionSettings_Tab_Settings_Direction_Title_Tooltip')}
          />
        </p>
        <SelectionList
          theme={this.styles}
          dataSource={[
            {
              value: directions.LTR,
              label: t('Accordion_AccordionSettings_Tab_Settings_Direction_LTR'),
              icon: LTRIcon,
              dataHook: 'ltrDirection',
            },
            {
              value: directions.RTL,
              label: t('Accordion_AccordionSettings_Tab_Settings_Direction_RTL'),
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

AccordionSettings.propTypes = {
  getDataManager: PropTypes.any.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
};

export default AccordionSettings;
