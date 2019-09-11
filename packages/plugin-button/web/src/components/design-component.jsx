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
      openedColorPicker: -1,
    };
  }

  componentDidUpdate = () => {
    this.props.onDesignChange(this.state);
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

  scrollColorPickerDown = () => {
    setTimeout(() => this.colorPicker3.scrollIntoView(false), 1);
  };

  onColorPickerClicked = index => {
    this.scrollColorPickerDown();
    if (this.state.openedColorPicker === index) {
      this.setState({ openedColorPicker: -1 });
    } else {
      this.setState({ openedColorPicker: index });
    }
  };

  componentDidMount() {
    this.alignButtonSample(this.state.activeButton);
  }

  render() {
    const styles = this.styles;
    const { theme, t, designObj } = this.props;
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
              <ColorPicker
                {...this.props}
                onChange={this.onTextColorChange.bind(this)}
                onClick={e => this.onColorPickerClicked(e)}
                color={designObj.textColor}
                theme={theme}
                isOpened={this.state.openedColorPicker === 0}
                index={0}
                scrollColorPickerDown={this.scrollColorPickerDown}
              >
                {t('ButtonModal_Text_Color')}
              </ColorPicker>
              <ColorPicker
                {...this.props}
                onChange={this.onBorderColorChange.bind(this)}
                onClick={e => this.onColorPickerClicked(e)}
                color={designObj.borderColor}
                theme={theme}
                isOpened={this.state.openedColorPicker === 1}
                index={1}
                scrollColorPickerDown={this.scrollColorPickerDown}
              >
                {t('ButtonModal_Border_Color')}
              </ColorPicker>
              <ColorPicker
                {...this.props}
                color={designObj.backgroundColor}
                theme={theme}
                onChange={this.onBackgroundColorChange.bind(this)}
                onClick={e => this.onColorPickerClicked(e)}
                isOpened={this.state.openedColorPicker === 2}
                index={2}
                colorPickerRef={ref => {
                  this.colorPicker3 = ref;
                }}
                scrollColorPickerDown={this.scrollColorPickerDown}
              >
                {t('ButtonModal_Background_Color')}
              </ColorPicker>
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
};

export default DesignComponent;
