import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  SelectionList,
  LabeledToggle,
  Separator,
  InfoIcon,
  LTRIcon,
  RTLIcon,
} from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';

import { LAYOUT, DIRECTION } from '../../../constants';
import { LayoutGridIcon, LayoutListIcon } from '../../../assets/icons';

import styles from './layout-settings-section.scss';

export class LayoutSettingsSection extends Component {
  styles = mergeStyles({ styles, theme: this.props.theme });

  updateSettings(layout) {
    this.props.store.update('componentData', {
      layout,
    });
  }

  handlePollTypeChange = type => {
    this.updateSettings({
      poll: { type },
      option: { enableImage: type === LAYOUT.GRID },
    });

    window.dispatchEvent(new Event('resize'));
  };

  handleDirectionChange = direction => {
    this.updateSettings({
      poll: { direction },
    });
  };

  renderOption = ({ item }) => (
    <>
      <item.icon />
      <p className={styles.selectionListOptionLabel}>{item.label}</p>
    </>
  );

  render() {
    const { componentData, t, isMobile } = this.props;

    const { poll, option } = componentData.layout;

    return (
      <section className={styles.section}>
        {!isMobile && (
          <>
            <p className={styles.title}>
              {t('Poll_PollSettings_Tab_Layout_Section_Question_Header')}
            </p>

            <LabeledToggle
              label={t('Poll_PollSettings_Tab_Layout_Section_Question_Image')}
              checked={poll?.enableImage}
              onChange={() => this.updateSettings({ poll: { enableImage: !poll?.enableImage } })}
              theme={this.props.theme}
            />

            <Separator horizontal className={styles.separator} />
          </>
        )}

        <p className={styles.title}>{t('Poll_PollSettings_Tab_Layout_Section_Answers_Header')}</p>
        <p className={styles.subtitle}>
          {t('Poll_PollSettings_Tab_Layout_Section_Answers_Layout')}
        </p>

        <SelectionList
          theme={this.styles}
          dataSource={[
            {
              value: LAYOUT.LIST,
              label: t('Poll_PollSettings_Tab_Layout_Section_Answers_Layout_List'),
              icon: LayoutListIcon,
            },
            {
              value: LAYOUT.GRID,
              label: t('Poll_PollSettings_Tab_Layout_Section_Answers_Layout_Grid'),
              icon: LayoutGridIcon,
            },
          ]}
          renderItem={this.renderOption}
          value={poll?.type}
          onChange={this.handlePollTypeChange}
          className={styles.layout_selector}
        />

        {!isMobile && (
          <LabeledToggle
            label={t('Poll_PollSettings_Tab_Layout_Section_Answers_Image')}
            checked={option?.enableImage}
            onChange={() => this.updateSettings({ option: { enableImage: !option?.enableImage } })}
            theme={this.props.theme}
          />
        )}

        <Separator horizontal className={styles.separator} />

        <p className={styles.title}>
          {t('Poll_PollSettings_Tab_Layout_Section_TextDirection_Header')}
          &nbsp;
          <InfoIcon
            tooltipText={t('Poll_PollSettings_Tab_Layout_Section_TextDirection_Header_Tooltip')}
          />
        </p>

        <SelectionList
          theme={this.styles}
          dataSource={[
            {
              value: DIRECTION.LTR,
              label: t('Poll_PollSettings_Tab_Layout_Section_TextDirection_LTR'),
              icon: LTRIcon,
            },
            {
              value: DIRECTION.RTL,
              label: t('Poll_PollSettings_Tab_Layout_Section_TextDirection_RTL'),
              icon: RTLIcon,
            },
          ]}
          renderItem={this.renderOption}
          value={poll?.direction}
          onChange={this.handleDirectionChange}
          className={styles.layout_selector}
        />
      </section>
    );
  }
}

LayoutSettingsSection.propTypes = {
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
  componentData: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};
