import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  ColorPicker,
  SliderWithInput,
  SettingsSection,
  mergeStyles,
} from 'wix-rich-content-common';
import classNames from 'classnames';
import ButtonSample from '../components/button-sample';
import ColorToggleComponent from './color-toggle-component';
import { DEFAULT_PALETTE } from '../constants';
import styles from '../../statics/styles/design-component-styles.scss';

class DesignComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { designObj } = this.props;
    const {
      settings: { colors, getTextColors, getBorderColors, getBackgroundColors },
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
      textCustomcolors: getTextColors() || [],
      borderCustomcolors: getBorderColors() || [],
      backgroundCustomcolors: getBackgroundColors() || [],
      colorToggle: { index: -1, isOpened: false },
    };

    this.onBackgroundcolorAdded = this.onBackgroundcolorAdded.bind(this);
    this.onBordercolorAdded = this.onBordercolorAdded.bind(this);
    this.onTextcolorAdded = this.onTextcolorAdded.bind(this);
  }

  componentDidUpdate = () => {
    this.props.onDesignChange(this.state);
  };

  onBackgroundcolorAdded(color) {
    this.props.settings.onBackgroundColorAdded(color);
    this.setState({
      backgroundCustomcolors: this.props.settings.getBackgroundColors() || [],
    });
  }

  onBordercolorAdded = color => {
    this.props.settings.onBorderColorAdded(color);
    this.setState({
      borderCustomcolors: this.props.settings.getBorderColors() || [],
    });
  };

  onTextcolorAdded = color => {
    this.props.settings.onTextColorAdded(color);
    this.setState({
      textCustomcolors: this.props.settings.getTextColors() || [],
    });
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

  onToggled = (index, isOpened) => {
    if (index !== this.state.colorToggle.index) {
      this.setState({ colorToggle: { index, isOpened: true } });
    } else {
      this.setState({ colorToggle: { index, isOpened } });
    }
  };

  colorPickerMarginBottom(index) {
    const { isMobile } = this.props;
    const { colorToggle } = this.state;
    return !isMobile && colorToggle.index === index && colorToggle.isOpened
      ? '7px'
      : isMobile
      ? colorToggle.index === index && colorToggle.isOpened
        ? '-4px'
        : '6px'
      : '24px';
  }

  render() {
    const styles = this.styles;
    const {
      theme,
      t,
      designObj,
      selectionBackgroundColor,
      selectionBorderColor,
      selectionTextColor,
      palette,
      isMobile,
    } = this.props;
    const addButtonStyle = {
      color: '#000',
      width: '27px',
      height: '27px',
    };
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
      <div onKeyPress={this.props.onKeyPress}>
        <SettingsSection
          theme={theme}
          ariaProps={{ 'aria-label': 'button sample selection', role: 'region' }}
        >
          <div className={styles.button_samples_container}>
            <div
              className={classNames(styles.button_samples)}
              ref={ref => (this.sampleContainer = ref)}
            >
              {buttonSampleList}
            </div>
          </div>
        </SettingsSection>
        <div className={styles.design_component}>
          <SettingsSection
            theme={theme}
            ariaProps={{ 'aria-label': 'border selection', role: 'region' }}
          >
            <div className={styles.row}>
              <div className={styles.section_header_border}>{t('ButtonModal_Border_Section')}</div>
              <div className={styles.input_container_width}>
                <div className={styles.slider_with_input}>
                  <SliderWithInput
                    value={parseInt(this.state.borderWidth)}
                    min={0}
                    max={15}
                    label={t('ButtonModal_Width_Input')}
                    onChange={this.onBorderWidthChange.bind(this)}
                    theme={this.styles}
                    onKeyPress
                  />
                </div>
              </div>
              <div className={styles.input_container_corner}>
                <div className={styles.slider_with_input}>
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
            <div style={{ border: 'none' }} className={styles.colorPicker_container}>
              <div className={styles.section_header_color}>{t('ButtonModal_Color_Section')}</div>

              <ColorToggleComponent
                theme={theme}
                color={this.state.textColor}
                index={0}
                isMobile={isMobile}
                marginBottom={this.colorPickerMarginBottom(0)}
                toggle={this.onToggled.bind(this)}
              >
                {t('ButtonModal_Text_Color')}
              </ColorToggleComponent>
              {this.state.colorToggle.index === 0 && this.state.colorToggle.isOpened && (
                <ColorPicker
                  color={designObj.textColor}
                  selectionColor={selectionTextColor || '#FEFDFD'}
                  palette={palette.slice(0, 7) || DEFAULT_PALETTE}
                  userColors={this.state.textCustomcolors.slice(0, 100)}
                  onColorAdded={this.onTextcolorAdded}
                  theme={this.styles}
                  isOneRow
                  isMobile={isMobile}
                  addButtonStyle={addButtonStyle}
                  onChange={this.onTextColorChange.bind(this)}
                  t={t}
                />
              )}
              <ColorToggleComponent
                theme={theme}
                color={this.state.borderColor}
                index={1}
                isMobile={isMobile}
                marginBottom={this.colorPickerMarginBottom(1)}
                toggle={this.onToggled.bind(this)}
              >
                {t('ButtonModal_Border_Color')}
              </ColorToggleComponent>
              {this.state.colorToggle.index === 1 && this.state.colorToggle.isOpened && (
                <ColorPicker
                  color={designObj.borderColor}
                  selectionColor={selectionBorderColor || '#FEFDFD'}
                  palette={palette.slice(0, 7) || DEFAULT_PALETTE}
                  userColors={this.state.borderCustomcolors.slice(0, 100)}
                  onColorAdded={this.onBordercolorAdded}
                  theme={this.styles}
                  isOneRow
                  isMobile={isMobile}
                  addButtonStyle={addButtonStyle}
                  onChange={this.onBorderColorChange.bind(this)}
                  t={t}
                />
              )}

              <ColorToggleComponent
                theme={theme}
                color={this.state.backgroundColor}
                index={2}
                isMobile={isMobile}
                marginBottom={this.colorPickerMarginBottom(2)}
                toggle={this.onToggled.bind(this)}
              >
                {t('ButtonModal_Background_Color')}
              </ColorToggleComponent>
              {this.state.colorToggle.index === 2 && this.state.colorToggle.isOpened && (
                <ColorPicker
                  color={designObj.backgroundColor}
                  selectionColor={selectionBackgroundColor}
                  palette={palette.slice(0, 7) || DEFAULT_PALETTE}
                  userColors={this.state.backgroundCustomcolors.slice(0, 100)}
                  onColorAdded={this.onBackgroundcolorAdded}
                  theme={this.styles}
                  isOneRow
                  isMobile={isMobile}
                  addButtonStyle={addButtonStyle}
                  onChange={this.onBackgroundColorChange.bind(this)}
                  t={t}
                />
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
  selectionBackgroundColor: PropTypes.string,
  selectionBorderColor: PropTypes.string,
  selectionTextColor: PropTypes.string,
  palette: PropTypes.arrayOf(PropTypes.string),
  isMobile: PropTypes.bool,
};

export default DesignComponent;
