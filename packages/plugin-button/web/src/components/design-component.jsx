import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ColorPicker, SliderWithInput, SettingsSection } from 'wix-rich-content-plugin-commons';
import { mergeStyles } from 'wix-rich-content-common';
import classNames from 'classnames';
import ButtonSample from '../components/button-sample';
import ColorToggleComponent from './color-toggle-component';
import { COLOR_PICKER_TYPE, buttonPreviews } from '../constants';
import { DEFAULT_PALETTE, getColors } from '../defaults';
import dcStyle from '../../statics/styles/design-component-styles.scss';

class DesignComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles: dcStyle, theme: props.theme });
    const { designObj } = this.props;
    const {
      settings: { colors, getTextColors, getBorderColors, getBackgroundColors },
    } = this.props;
    this.presetStyle = buttonPreviews(colors || getColors());
    this.state = {
      design: {
        borderWidth: designObj.borderWidth,
        padding: designObj.padding,
        borderRadius: designObj.borderRadius,
        activeButton: designObj.activeButton,
        color: designObj?.color || colors.color1,
        borderColor: designObj?.borderColor || colors.color8,
        background: designObj?.background || colors.color8,
      },
      customBackgroundColors: (getBackgroundColors && getBackgroundColors()) || DEFAULT_PALETTE,
      customTextColors: (getTextColors && getTextColors()) || DEFAULT_PALETTE,
      customBorderColors: (getBorderColors && getBorderColors()) || DEFAULT_PALETTE,
      pickerType: '',
    };
  }

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

  alignButtonSample = i => {
    this.sampleContainer.scrollTo(80 * i, 0);
  };

  onButtonSampleClick = index => {
    this.alignButtonSample(index);
    const design = {
      activeButton: index,
      borderWidth: parseInt(this.presetStyle[index].borderWidth),
      borderRadius: parseInt(this.presetStyle[index].borderRadius),
      color: this.presetStyle[index].color,
      background: this.presetStyle[index].background,
      borderColor: this.presetStyle[index].borderColor,
    };
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

  componentDidMount() {
    this.alignButtonSample(this.state.design.activeButton);
  }

  onToggled = pickerType => {
    this.setState({ pickerType: pickerType !== this.state.pickerType ? pickerType : '' });
  };

  renderColorPicker(color, userColors, onColorAdded, onChange, pickerType, label) {
    const { t, isMobile, theme, palette } = this.props;
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
            palette={palette?.slice(0, 7) || DEFAULT_PALETTE}
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
    const buttonSampleList = this.presetStyle.map((style, i) => {
      const active = i === design.activeButton;
      return (
        <ButtonSample
          key={i.toString()}
          active={active}
          i={i}
          onClick={this.onButtonSampleClick.bind(this)}
          t={t}
          theme={theme}
          style={style}
          buttonObj={design}
        />
      );
    });
    return (
      <div>
        <SettingsSection
          theme={theme}
          ariaProps={{ 'aria-label': 'button sample selection', role: 'region' }}
        >
          <div className={styles.button_designComponent_samples_container}>
            <div
              className={classNames(styles.button_designComponent_samples)}
              ref={ref => (this.sampleContainer = ref)}
            >
              {buttonSampleList}
            </div>
          </div>
        </SettingsSection>
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
                    value={parseInt(design.borderWidth)}
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
                    value={parseInt(design.borderRadius)}
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
  onDesignChange: PropTypes.func.isRequired,
  getTextColors: PropTypes.func,
  getBorderColors: PropTypes.func,
  getBackgroundColors: PropTypes.func,
  palette: PropTypes.string,
  isMobile: PropTypes.bool,
};

export default DesignComponent;
