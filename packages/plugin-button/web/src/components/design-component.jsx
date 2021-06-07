import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ColorPicker, SliderWithInput } from 'wix-rich-content-plugin-commons';
import { SettingsSection } from 'wix-rich-content-ui-components';
import { mergeStyles } from 'wix-rich-content-common';
import ColorToggleComponent from './color-toggle-component';
import { COLOR_PICKER_TYPE } from '../constants';
import { DEFAULT_PALETTE } from '../defaults';
import dcStyle from '../../statics/styles/design-component-styles.scss';

class DesignComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles: dcStyle, theme: props.theme });
    const { designObj } = this.props;
    const {
      settings,
      settings: { colors, themeData },
      config,
    } = this.props;
    const { colors: { actionColor, bgColor } = {} } = themeData || config?.themeData || {};
    this.state = {
      design: {
        borderWidth: designObj.borderWidth,
        padding: designObj.padding,
        borderRadius: designObj.borderRadius,
        activeButton: designObj.activeButton,
        color: designObj?.color || colors?.color1 || bgColor,
        borderColor: designObj?.borderColor || colors?.color8 || actionColor,
        background: designObj?.background || colors?.color8 || actionColor,
      },
      ...this.withColorOptions(settings),
      pickerType: '',
    };
    this.originalDesign = this.state.design;
  }

  withColorOptions = settings => {
    const { getTextColors, getBorderColors, getBackgroundColors, themeData } = settings;
    const { colors: { actionColor, bgColor } = {} } = themeData;
    const customBackgroundColors =
      (getBackgroundColors && getBackgroundColors()) || DEFAULT_PALETTE;
    const customTextColors = (getTextColors && getTextColors()) || DEFAULT_PALETTE;
    const customBorderColors = (getBorderColors && getBorderColors()) || DEFAULT_PALETTE;
    if (bgColor) {
      customTextColors.push(bgColor);
    }
    if (actionColor) {
      customBackgroundColors.push(actionColor);
      customBorderColors.push(actionColor);
    }
    return {
      customBackgroundColors,
      customTextColors,
      customBorderColors,
    };
  };

  componentDidUpdate = () => {
    this.props.onDesignChange(this.state.design);
  };

  onBackgroundColorAdded = color => {
    const {
      settings: { getBackgroundColors, onBackgroundColorAdded },
    } = this.props;
    onBackgroundColorAdded && onBackgroundColorAdded(color);
    const customBackgroundColors = (getBackgroundColors && getBackgroundColors()) || [
      ...this.state.customBackgroundColors,
      color,
    ];
    this.setState({ customBackgroundColors });
  };

  onBorderColorAdded = color => {
    const {
      settings: { getBorderColors, onBorderColorAdded },
    } = this.props;
    onBorderColorAdded && onBorderColorAdded(color);
    const customBorderColors = (getBorderColors && getBorderColors()) || [
      ...this.state.customBorderColors,
      color,
    ];
    this.setState({ customBorderColors });
  };

  onTextColorAdded = color => {
    const {
      settings: { getTextColors, onTextColorAdded },
    } = this.props;
    onTextColorAdded && onTextColorAdded(color);
    const customTextColors = (getTextColors && getTextColors()) || [
      ...this.state.customTextColors,
      color,
    ];
    this.setState({ customTextColors });
  };

  onBorderWidthChange = value => {
    const design = { ...this.state.design, borderWidth: value, padding: 12 - value / 2 };
    this.setState({ design });
  };

  onBorderRadiusChange = value => {
    const design = { ...this.state.design, borderRadius: value };
    this.setState({ design });
  };

  onTextColorChange = color => {
    const design = { ...this.state.design, color };
    this.setState({ design });
  };

  onBorderColorChange = color => {
    const design = { ...this.state.design, borderColor: color };
    this.setState({ design });
  };

  onBackgroundColorChange = color => {
    const design = { ...this.state.design, background: color };
    this.setState({ design });
  };

  onToggled = pickerType => {
    this.setState({ pickerType: pickerType !== this.state.pickerType ? pickerType : '' });
  };

  renderColorPicker(color, userColors, onColorAdded, onChange, pickerType, label) {
    const { t, isMobile, theme, palette } = this.props;
    const paletteColors =
      (isMobile ? palette?.slice(0, 5) : palette?.slice(0, 7)) || DEFAULT_PALETTE;

    return (
      <div>
        <ColorToggleComponent
          theme={theme}
          color={color}
          pickerType={pickerType}
          isMobile={isMobile}
          isToggle={this.state.pickerType === pickerType}
          toggle={this.onToggled.bind(this)}
        >
          {label}
        </ColorToggleComponent>
        {this.state.pickerType === pickerType && (
          <ColorPicker
            color={color}
            palette={paletteColors}
            userColors={userColors.slice(0, 100)}
            onColorAdded={onColorAdded}
            theme={this.styles}
            isMobile={isMobile}
            onChange={onChange.bind(this)}
            t={t}
          >
            {({ renderUserColors, renderAddColorButton }) => (
              <div className={dcStyle.colorPicker_palette}>
                <div className={dcStyle.colorPicker_buttons_container}>
                  <div>{renderUserColors()}</div>
                  <div>{renderAddColorButton()}</div>
                </div>
              </div>
            )}
          </ColorPicker>
        )}
      </div>
    );
  }

  render() {
    const styles = this.styles;
    const { theme, t } = this.props;
    const { design } = this.state;
    return (
      <div className={styles.button_designComponent_design_component}>
        <SettingsSection
          theme={theme}
          ariaProps={{ 'aria-label': 'border selection', role: 'region' }}
        >
          <div className={styles.button_designComponent_row}>
            <div className={styles.button_designComponent_section_header_border}>
              {t('ButtonModal_Border_Section')}
            </div>
            <div className={styles.button_designComponent_input_container_width}>
              <div className={styles.button_designComponent_slider_with_input}>
                <SliderWithInput
                  defaultValue={parseInt(design.borderWidth)}
                  min={0}
                  max={15}
                  label={t('ButtonModal_Width_Input')}
                  onChange={this.onBorderWidthChange.bind(this)}
                  theme={this.styles}
                />
              </div>
            </div>
            <div className={styles.button_designComponent_input_container_corner}>
              <div className={styles.button_designComponent_slider_with_input}>
                <SliderWithInput
                  defaultValue={parseInt(design.borderRadius)}
                  min={0}
                  max={15}
                  label={t('ButtonModal_Radius_Input')}
                  onChange={this.onBorderRadiusChange.bind(this)}
                  theme={this.styles}
                />
              </div>
            </div>
          </div>
        </SettingsSection>
        <SettingsSection
          theme={theme}
          ariaProps={{ 'aria-label': 'color selection', role: 'region' }}
        >
          <div className={styles.button_designComponent_colorPicker_container}>
            <div className={styles.button_designComponent_section_header_color}>
              {t('ButtonModal_Color_Section')}
            </div>

            {this.renderColorPicker(
              design.color,
              this.state.customTextColors,
              this.onTextColorAdded,
              this.onTextColorChange,
              COLOR_PICKER_TYPE.TEXT_COLOR,
              t('ButtonModal_Text_Color')
            )}
            {this.renderColorPicker(
              design.borderColor,
              this.state.customBorderColors,
              this.onBorderColorAdded,
              this.onBorderColorChange,
              COLOR_PICKER_TYPE.BORDER_COLOR,
              t('ButtonModal_Border_Color')
            )}
            {this.renderColorPicker(
              design.background,
              this.state.customBackgroundColors,
              this.onBackgroundColorAdded,
              this.onBackgroundColorChange,
              COLOR_PICKER_TYPE.BACKGROUND_COLOR,
              t('ButtonModal_Background_Color')
            )}
          </div>
        </SettingsSection>
      </div>
    );
  }
}

DesignComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object,
  t: PropTypes.func,
  designObj: PropTypes.object,
  settings: PropTypes.object,
  config: PropTypes.object,
  onDesignChange: PropTypes.func.isRequired,
  getTextColors: PropTypes.func,
  getBorderColors: PropTypes.func,
  getBackgroundColors: PropTypes.func,
  palette: PropTypes.arrayOf(PropTypes.string),
  isMobile: PropTypes.bool,
};

export default DesignComponent;
