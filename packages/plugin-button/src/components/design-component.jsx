import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  SliderWithInput,
  SettingsSection,
  mergeStyles,
  WixUtils,
} from 'wix-rich-content-common';
import classNames from 'classnames';
import ButtonSample from '../components/button-sample';
import ColorPicker from './color-picker';
import styles from '../../statics/styles/design-component-styles.scss';




class DesignComponent extends PureComponent {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { designObj } = this.props;
    const { colors } = this.props.settings;
    this.presetStyle = [
      {
        className: 'button_primary',
        border: '0px solid #' + colors.color_8,
        borderRadius: '0px',
        borderWidth: '0px',
        background: colors.color_8,
        color: colors.color_1,
        borderColor: colors.color_8
      },
      {
        className: 'button_secondary',
        border: '1px solid ' + colors.color_8,
        borderRadius: '0px',
        borderWidth: '1px',
        background: colors.color_1,
        color: colors.color_8,
        borderColor: colors.color_8
      },
      {
        className: 'button_secondary',
        border: '1px solid ' + colors.color_8,
        borderRadius: '0px',
        borderWidth: '1px',
        background: colors.color_7,
        color: colors.color_8,
        borderColor: colors.color_8
      },
      {
        className: 'button_secondary',
        border: '1px solid ' + colors.color_8,
        borderRadius: '10px',
        borderWidth: '1px',
        background: colors.color_7,
        color: colors.color_8,
        borderColor: colors.color_8
      },
      {
        className: 'button_secondary',
        border: '1px solid ' + colors.color_8,
        borderWidth: '5px',
        borderRadius: '0px',
        background: colors.color_1,
        color: colors.color_8,
        borderColor: colors.color_8
      },
    ];
    this.state = {
      borderWidth: designObj.borderWidth,
      borderRadius: designObj.borderRadius,
      activeButton: designObj.activeButton,
      textColor: designObj.textColor ? designObj.textColor : colors.color_1,
      borderColor: designObj.borderColor ? designObj.borderColor : colors.color_8,
      backgroundColor: designObj.backgroundColor ? designObj.backgroundColor : colors.color_8,
      url: designObj.url
    };
  }

  componentDidUpdate = () => {
    this.props.onDesignChange(this.state);
  }

  onBorderWidthChange = value => {
    this.setState({ borderWidth: value });
  };

  onBorderRadiusChange = value => {
    this.setState({ borderRadius: value });
  };



  onButtonSampleClick = index => {
    this.setState({
      activeButton: index,
      borderWidth: parseInt(this.presetStyle[index].borderWidth),
      borderRadius: parseInt(this.presetStyle[index].borderRadius),
      textColor: this.presetStyle[index].color,
      backgroundColor: this.presetStyle[index].background,
      borderColor: this.presetStyle[index].borderColor
    });
  }

  onTextColorChange = color => {
    this.setState({ textColor: color });
  }

  onBorderColorChange = color => {
    this.setState({ borderColor: color });
  }

  onBackgroundColorChange = color => {
    this.setState({ backgroundColor: color });
  }

  render() {
    const styles = this.styles;
    const { theme, t, designObj } = this.props;
    const buttonSampleList = this.presetStyle.map((style, i) => {
      const active = i === this.state.activeButton;
      return (<ButtonSample
        key={i.toString()}
        active={active}
        i={i}
        onClickButton={this.onButtonSampleClick.bind(this)}
        {...this.props}
        style={style}
        buttonObj={this.state}
      />);
    });

    return (
      <div className={styles.design_component}>
        <SettingsSection theme={theme} ariaProps={{ 'aria-label': 'button sample selection', role: 'region' }}>
          <div className={styles.button_samples_container}>
            {WixUtils.isMobile() &&
              <div>
                <div className={styles.right_shadow} />
                <div className={styles.left_shadow} />
              </div>
            }
            <div className={classNames(styles.button_samples)}>
              {buttonSampleList}
            </div>
          </div>
        </SettingsSection>
        <SettingsSection theme={theme} ariaProps={{ 'aria-label': 'border selection', role: 'region' }}>
          <div className={styles.row} >
            <div className={styles.section_header_border}>
              {t('ButtonModal_Border_Section')}
            </div>
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
              <div className={styles.px_label}>
                px
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
              <div className={styles.px_label}>
                px
              </div>
            </div>
          </div>
        </SettingsSection>
        <SettingsSection theme={theme} ariaProps={{ 'aria-label': 'color selection', role: 'region' }}>
          <div style={{ border: 'none' }} className={styles.row} >
            <div className={styles.section_header_color}>
              {t('ButtonModal_Color_Section')}
            </div>
            <ColorPicker
              {...this.props}
              onChange={this.onTextColorChange.bind(this)}
              onClick={() => this.setState({ textFlag: true, borderFlag: false, backgroundFlag: false })}
              color={designObj.textColor}
              theme={theme}
              flag={this.state.textFlag}
            >
              {t('ButtonModal_Text_Color')}
            </ColorPicker>
            <ColorPicker
              {...this.props}
              onChange={this.onBorderColorChange.bind(this)}
              onClick={() => this.setState({ textFlag: false, borderFlag: true, backgroundFlag: false })}
              color={designObj.borderColor}
              theme={theme}
              flag={this.state.borderFlag}
            >
              {t('ButtonModal_Border_Color')}
            </ColorPicker>
            <ColorPicker
              {...this.props}
              color={designObj.backgroundColor}
              theme={theme}
              onChange={this.onBackgroundColorChange.bind(this)}
              onClick={() => this.setState({ textFlag: false, borderFlag: false, backgroundFlag: true })}
              flag={this.state.backgroundFlag}
            >
              {t('ButtonModal_Background_Color')}
            </ColorPicker>
          </div>
        </SettingsSection>
      </div>
    );
  }
}

DesignComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object,
  t: PropTypes.func
};

export default DesignComponent;
