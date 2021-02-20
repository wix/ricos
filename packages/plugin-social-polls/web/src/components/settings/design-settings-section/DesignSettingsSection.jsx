import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ColorPicker, SelectionList, SliderWithInput } from 'wix-rich-content-plugin-commons';
import { Separator } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';

import { ColorIcon, ImageIcon, GradientIcon } from '../../../assets/icons';
import { BACKGROUND_PRESETS, BACKGROUND_TYPE } from '../../../defaults';
import { getBackgroundString } from '../../../helpers';

import styles from './design-settings-section.scss';

export class DesignSettingsSection extends Component {
  static PICK_BACKGROUND_LABELS = {
    [BACKGROUND_TYPE.COLOR]: 'Poll_PollSettings_Tab_Design_Section_Background_Color_Pick',
    [BACKGROUND_TYPE.IMAGE]: 'Poll_PollSettings_Tab_Design_Section_Background_Pattern_Pick',
    [BACKGROUND_TYPE.GRADIENT]: 'Poll_PollSettings_Tab_Design_Section_Background_Gradient_Pick',
  };

  styles = mergeStyles({ styles, theme: this.props.theme });

  state = {
    backgroundType: this.props.componentData.design.poll?.backgroundType || BACKGROUND_TYPE.COLOR,
  };

  updateDesign(design) {
    this.props.store.update('componentData', { design });
  }

  handleBackgroundChange = value => {
    const { backgroundType } = this.state;

    let background = value;

    if (backgroundType === BACKGROUND_TYPE.GRADIENT) {
      background = JSON.parse(value);
    }

    this.updateDesign({ poll: { background, backgroundType } });
  };

  handlePollBorderRadiusChange = borderRadius =>
    this.updateDesign({ poll: { borderRadius: `${borderRadius}px` } });

  handleOptionBorderRadiusChange = borderRadius =>
    this.updateDesign({ option: { borderRadius: `${borderRadius}px` } });

  handleTypeChange = backgroundType => {
    this.setState({ backgroundType }, () =>
      this.handleBackgroundChange(BACKGROUND_PRESETS[backgroundType][0])
    );
  };

  dataMapper = ({ name }) => ({ value: name });

  renderOption = ({ item }) => (
    <>
      <item.icon />
      <p className={styles.selectionListOptionLabel}>{item.label}</p>
    </>
  );

  getBackgroundColorValue() {
    const { componentData } = this.props;
    const { backgroundType } = this.state;

    const { design } = componentData;
    return getBackgroundString(design.poll?.background, backgroundType, 48, 48);
  }

  getColorPalettePreset() {
    const { backgroundType } = this.state;

    const preset = BACKGROUND_PRESETS[backgroundType];

    return preset.map(value => getBackgroundString(value, backgroundType, 48, 48));
  }

  render() {
    const { t, componentData } = this.props;
    const { backgroundType } = this.state;

    const { design } = componentData;

    return (
      <section className={styles.section}>
        <p className={styles.title}>
          {t('Poll_PollSettings_Tab_Design_Section_Background_Header')}
        </p>
        <p className={styles.subtitle}>
          {t('Poll_PollSettings_Tab_Design_Section_Background_Choose')}
        </p>
        <SelectionList
          theme={this.styles}
          dataSource={[
            {
              name: BACKGROUND_TYPE.COLOR,
              label: t('Poll_PollSettings_Tab_Design_Section_Background_Color'),
              icon: ColorIcon,
            },
            {
              name: BACKGROUND_TYPE.GRADIENT,
              label: t('Poll_PollSettings_Tab_Design_Section_Background_Gradient'),
              icon: GradientIcon,
            },
            {
              name: BACKGROUND_TYPE.IMAGE,
              label: t('Poll_PollSettings_Tab_Design_Section_Background_Pattern'),
              icon: ImageIcon,
            },
          ]}
          dataMapper={this.dataMapper}
          renderItem={this.renderOption}
          onChange={this.handleTypeChange}
          value={backgroundType}
          className={styles.layout_selector}
        />
        <p className={styles.title}>
          {t(DesignSettingsSection.PICK_BACKGROUND_LABELS[backgroundType])}
        </p>
        <ColorPicker
          color={this.getBackgroundColorValue()}
          palette={this.getColorPalettePreset()}
          schemeAttributes={BACKGROUND_PRESETS[backgroundType]}
          onChange={this.handleBackgroundChange}
          theme={this.styles}
          t={t}
        >
          {({ renderPalette }) => <div>{renderPalette()}</div>}
        </ColorPicker>
        <Separator horizontal className={styles.separator} />
        <p className={styles.title}>
          {t('Poll_PollSettings_Tab_Design_Section_CornerRadius_Header')}
        </p>
        <SliderWithInput
          min={0}
          max={20}
          label={t('Poll_PollSettings_Tab_Design_Section_CornerRadius_Poll')}
          onChange={this.handlePollBorderRadiusChange}
          value={parseInt(design.poll?.borderRadius)}
          theme={this.props.theme}
        />
        <SliderWithInput
          min={0}
          max={10}
          label={t('Poll_PollSettings_Tab_Design_Section_CornerRadius_Answers')}
          onChange={this.handleOptionBorderRadiusChange}
          value={parseInt(design.option?.borderRadius)}
          theme={this.props.theme}
        />
      </section>
    );
  }
}

DesignSettingsSection.propTypes = {
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};
