import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import {
  RadioGroupVertical,
  SelectionList,
  Separator,
  InfoIcon,
} from 'wix-rich-content-editor-common';
import { LTRIcon } from './icons/LTRIcon';
import { RTLIcon } from './icons/RTLIcon';
import styles from '../../statics/styles/accordion-settings.scss';

class AccordionSettings extends Component {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
    this.initialState = { ...this.state };
    const { t, theme } = props;
    this.styles = mergeStyles({ styles, theme });
    this.collapseViewTitle = t('Accordion_AccordionSettings_Tab_Settings_CollapseView_Title');
    this.collapseViewExpanded = t('Accordion_AccordionSettings_Tab_Settings_CollapseView_Expanded');
    this.collapseViewCollapsed = t(
      'Accordion_AccordionSettings_Tab_Settings_CollapseView_Collapsed'
    );
    this.collapseViewFirstExpanded = t(
      'Accordion_AccordionSettings_Tab_Settings_CollapseView_FirstExpanded'
    );
  }

  stateFromProps(props) {
    return { ...props };
  }

  renderOption = ({ item }) => (
    <>
      <item.icon />
      <p>{item.label}</p>
    </>
  );

  render() {
    const { t } = this.props;

    return (
      <>
        <RadioGroupVertical
          label={this.collapseViewTitle}
          value={this.state.value}
          dataSource={[
            {
              value: 'collapsed',
              labelText: this.collapseViewCollapsed,
              dataHook: 'radioGroupCollapsed',
            },
            {
              value: 'first_expanded',
              labelText: this.collapseViewFirstExpanded,
              dataHook: 'radioGroupFirstExpanded',
            },
            {
              value: 'expanded',
              labelText: this.collapseViewExpanded,
              dataHook: 'radioGroupExpanded',
            },
          ]}
          t={t}
          onChange={value => this.setState({ value })}
          {...this.props}
        />
        {/* {this.state.value === 'collapsed'} */}
        <Separator horizontal className={styles.separator} />
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
              value: 'ltr',
              label: t('Accordion_AccordionSettings_Tab_Settings_Direction_LTR'),
              icon: LTRIcon,
            },
            {
              value: 'rtl',
              label: t('Accordion_AccordionSettings_Tab_Settings_Direction_RTL'),
              icon: RTLIcon,
            },
          ]}
          renderItem={this.renderOption}
          value={this.state.direction}
          onChange={direction => this.setState({ direction })}
          className={styles.direction_selector}
        />
      </>
    );
  }
}

AccordionSettings.propTypes = {
  componentData: PropTypes.any.isRequired,
  helpers: PropTypes.object,
  theme: PropTypes.object.isRequired,
  pubsub: PropTypes.any,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  languageDir: PropTypes.string,
  activeTab: PropTypes.string,
};

export default AccordionSettings;
