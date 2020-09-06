import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import { Separator, InfoIcon } from 'wix-rich-content-editor-common';
import { RadioGroupVertical, SelectionList, LabeledToggle } from 'wix-rich-content-plugin-commons';
import { LTRIcon, RTLIcon } from '../../icons';
import { directions, visualizations } from '../../defaults';
import styles from '../../../statics/styles/accordion-settings.scss';

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
    this.directionTitle = t('Accordion_AccordionSettings_Tab_Settings_Direction_Title');
    this.directionTooltipText = t(
      'Accordion_AccordionSettings_Tab_Settings_Direction_Title_Tooltip'
    );
    this.directionTitleLTR = t('Accordion_AccordionSettings_Tab_Settings_Direction_LTR');
    this.directionTitleRTL = t('Accordion_AccordionSettings_Tab_Settings_Direction_RTL');
    this.oneSectionToggleTitle = t(
      'Accordion_AccordionSettings_Tab_Settings_CollapseView_InSections'
    );
  }

  stateFromProps(props) {
    const { store } = props;
    const { config } = store.get('componentData');
    return { ...config };
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState !== this.state) {
      this.updateComponentData();
    }
  }

  updateComponentData = () => {
    const {
      componentData: { config },
      store,
      componentData,
    } = this.props;
    const updatedComponentData = {
      ...componentData,
      config: { ...config, ...this.state },
    };
    store.set('componentData', updatedComponentData);
  };

  handleVisualizationChange = visualization => {
    this.setState({
      visualization,
      expandOneSection:
        visualization === visualizations.EXPANDED ? false : this.state.expandOneSection,
    });
  };

  handleDirectionChange = direction => {
    this.setState({ direction });
  };

  renderOption = ({ item }) => (
    <>
      <item.icon />
      <p>{item.label}</p>
    </>
  );

  render() {
    const { t, theme, isMobile } = this.props;

    return (
      <div className={this.styles.settingsContainer}>
        <RadioGroupVertical
          label={this.collapseViewTitle}
          value={this.state.visualization}
          dataSource={[
            {
              value: visualizations.COLLAPSED,
              labelText: this.collapseViewCollapsed,
              dataHook: 'radioGroupCollapsed',
            },
            {
              value: visualizations.FIRST_EXPANDED,
              labelText: this.collapseViewFirstExpanded,
              dataHook: 'radioGroupFirstExpanded',
            },
            {
              value: visualizations.EXPANDED,
              labelText: this.collapseViewExpanded,
              dataHook: 'radioGroupExpanded',
            },
          ]}
          t={t}
          theme={theme}
          onChange={this.handleVisualizationChange}
        />
        {this.state.visualization !== visualizations.EXPANDED && (
          <LabeledToggle
            label={this.oneSectionToggleTitle}
            checked={this.state.expandOneSection}
            onChange={() => this.setState({ expandOneSection: !this.state.expandOneSection })}
            theme={theme}
            style={isMobile ? { paddingTop: '28px' } : {}}
          />
        )}
        <Separator horizontal className={this.styles.separator} />
        <p>
          {this.directionTitle}
          &nbsp;
          <InfoIcon tooltipText={this.directionTooltipText} />
        </p>
        <SelectionList
          theme={this.styles}
          dataSource={[
            {
              value: directions.LTR,
              label: this.directionTitleLTR,
              icon: LTRIcon,
              dataHook: 'ltrDirection',
            },
            {
              value: directions.RTL,
              label: this.directionTitleRTL,
              icon: RTLIcon,
              dataHook: 'rtlDirection',
            },
          ]}
          renderItem={this.renderOption}
          value={this.state.direction}
          onChange={this.handleDirectionChange}
          className={this.styles.direction_selector}
          optionClassName={this.styles.direction_selector_option}
        />
      </div>
    );
  }
}

AccordionSettings.propTypes = {
  componentData: PropTypes.any.isRequired,
  theme: PropTypes.object.isRequired,
  store: PropTypes.any,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
};

export default AccordionSettings;
