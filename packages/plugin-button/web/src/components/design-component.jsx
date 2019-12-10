import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ColorPicker, SliderWithInput, SettingsSection } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';
import classNames from 'classnames';
import ButtonSample from '../components/button-sample';
import ColorToggleComponent from './color-toggle-component';
import { DEFAULT_PALETTE, COLOR_PICKER_TYPE } from '../constants';
import styles from '../../statics/styles/design-component-styles.scss';

class DesignComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { designObj } = this.props;
    const {
      settings: { colors },
    } = this.props;
    this.presetStyle = [
      {
        className: 'button_primary',
        border: '0px solid #' + colors.color8,
        borderRadius: '0px',
        borderWidth: '0px',
        background: colors.color8,
        color: colors.color1,
        borderColor: colors.color8,
      },
      {
        className: 'button_secondary',
        border: '1px solid ' + colors.color8,
        borderRadius: '0px',
        borderWidth: '1px',
        background: colors.color1,
        color: colors.color8,
        borderColor: colors.color8,
      },
      {
        className: 'button_secondary',
        border: '1px solid ' + colors.color8,
        borderRadius: '0px',
        borderWidth: '1px',
        background: colors.color7,
        color: colors.color8,
        borderColor: colors.color8,
      },
      {
        className: 'button_secondary',
        border: '1px solid ' + colors.color8,
        borderRadius: '10px',
        borderWidth: '1px',
        background: colors.color7,
        color: colors.color8,
        borderColor: colors.color8,
      },
      {
        className: 'button_secondary',
        border: '1px solid ' + colors.color8,
        borderWidth: '5px',
        borderRadius: '0px',
        background: colors.color1,
        color: colors.color8,
        borderColor: colors.color8,
      },
    ];
    this.state = {
      borderWidth: designObj.borderWidth,
      padding: designObj.padding,
      borderRadius: designObj.borderRadius,
      activeButton: designObj.activeButton,
      textColor: designObj.textColor ? designObj.textColor : colors.color1,
      borderColor: designObj.borderColor ? designObj.borderColor : colors.color8,
      backgroundColor: designObj.backgroundColor ? designObj.backgroundColor : colors.color8,
      pickerType: '',
    };
  }

  componentDidUpdate = () => {
    this.props.onDesignChange(this.state);
  };

  onBackgroundcolorAdded = color => {
    this.props.settings.onBackgroundColorAdded(color);
  };

  onBordercolorAdded = color => {
    this.props.settings.onBorderColorAdded(color);
  };

  onTextcolorAdded = color => {
    this.props.settings.onTextColorAdded(color);
  };

  onBorderWidthChange = value => {
    this.setState({ borderWidth: value, padding: 12 - value / 2 });
  };

  onBorderRadiusChange = value => {
    this.setState({ borderRadius: value });
  };

  alignButtonSample = i => {
    this.sampleContainer.scrollTo(80 * i, 0);
  };

  onButtonSampleClick = index => {
    this.alignButtonSample(index);
    this.setState({
      activeButton: index,
      borderWidth: parseInt(this.presetStyle[index].borderWidth),
      borderRadius: parseInt(this.presetStyle[index].borderRadius),
      textColor: this.presetStyle[index].color,
      backgroundColor: this.presetStyle[index].background,
      borderColor: this.presetStyle[index].borderColor,
    });
  };

  onTextColorChange = color => {
    this.setState({ textColor: color });
  };

  onBorderColorChange = color => {
    this.setState({ borderColor: color });
  };

  onBackgroundColorChange = color => {
    this.setState({ backgroundColor: color });
  };

  componentDidMount() {
    this.alignButtonSample(this.state.activeButton);
  }

  onToggled = pickerType => {
    this.setState({ pickerType: pickerType !== this.state.pickerType ? pickerType : '' });
  };

  renderColorPicker(stateColor, propColor, userColors, onColorAdded, onChange, pickerType, label) {
    const { t, isMobile, theme, palette } = this.props;
    return (
      <div>
        <ColorToggleComponent
          theme={theme}
          color={stateColor}
          pickerType={pickerType}
          isMobile={isMobile}
          isToggle={this.state.pickerType === pickerType}
          toggle={this.onToggled.bind(this)}
        >
          {label}
        </ColorToggleComponent>
        {this.state.pickerType === pickerType && (
          <ColorPicker
            color={propColor}
            palette={palette.slice(0, 7) || DEFAULT_PALETTE}
            userColors={userColors.slice(0, 100)}
            onColorAdded={onColorAdded}
            theme={this.styles}
            isMobile={isMobile}
            onChange={onChange.bind(this)}
            t={t}
          >
            {({ renderUserColors, renderAddColorButton, mergedStyles }) => (
              <div className={mergedStyles.colorPicker_palette}>
                <div className={mergedStyles.colorPicker_buttons_container}>
                  {renderAddColorButton()}
                  {renderUserColors()}
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
    const { theme, t, designObj, settings } = this.props;
    const buttonSampleList = this.presetStyle.map((style, i) => {
      const active = i === this.state.activeButton;
      return (
        <ButtonSample
          key={i.toString()}
          active={active}
          i={i}
          onClick={this.onButtonSampleClick.bind(this)}
          {...this.props}
          style={style}
          buttonObj={this.state}
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
                    value={parseInt(this.state.borderWidth)}
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
                    value={parseInt(this.state.borderRadius)}
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
                this.state.textColor,
                designObj.textColor,
                settings.getTextColors(),
                this.onTextcolorAdded,
                this.onTextColorChange,
                COLOR_PICKER_TYPE.TEXT_COLOR,
                t('ButtonModal_Text_Color')
              )}
              {this.renderColorPicker(
                this.state.borderColor,
                designObj.borderColor,
                settings.getBorderColors(),
                this.onBordercolorAdded,
                this.onBorderColorChange,
                COLOR_PICKER_TYPE.BORDER_COLOR,
                t('ButtonModal_Border_Color')
              )}
              {this.renderColorPicker(
                this.state.backgroundColor,
                designObj.backgroundColor,
                settings.getBackgroundColors(),
                this.onBackgroundcolorAdded,
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
  settings: PropTypes.object.isRequired,
  onDesignChange: PropTypes.func.isRequired,
  getTextColors: PropTypes.func,
  getBorderColors: PropTypes.func,
  getBackgroundColors: PropTypes.func,
  palette: PropTypes.arrayOf(PropTypes.string),
  isMobile: PropTypes.bool,
};

export default DesignComponent;
