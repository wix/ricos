import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  SliderWithInput,
  RadioGroup,
  SettingsSection,
  mergeStyles,
  WixUtils,
} from 'wix-rich-content-common';
import classNames from 'classnames';
import ButtonSample from '../components/button-sample';
import ColorPicker from './color-picker';
import styles from '../../statics/styles/design-component-styles.scss';

const arr = [
  {
    className: 'button_primary',
    border: '0px solid #0261FF',
    borderRadius: '0px',
    borderWidth: '0px',
    background: '#0261FF',
    color: 'white',
    borderColor: '#0261FF'
  },
  {
    className: 'button_secondary',
    border: '1px solid #0261FF',
    borderRadius: '0px',
    borderWidth: '1px',
    background: 'white',
    color: '#0261FF',
    borderColor: '#0261FF'
  },
  {
    className: 'button_secondary',
    border: '1px solid #0261FF',
    borderRadius: '0px',
    borderWidth: '1px',
    background: '#BCD4FD',
    color: '#0261FF',
    borderColor: '#0261FF'
  },
  {
    className: 'button_secondary',
    border: '1px solid #0261FF',
    borderRadius: '10px',
    borderWidth: '1px',
    background: '#BCD4FD',
    color: '#0261FF',
    borderColor: '#0261FF'
  },
  {
    className: 'button_secondary',
    border: '1px solid #0261FF',
    borderWidth: '5px',
    borderRadius: '0px',
    background: 'white',
    color: '#0261FF',
    borderColor: '#0261FF'
  },
];


class DesignComponent extends PureComponent {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { designObj } = this.props;
    this.state = {
      borderWidth: designObj.borderWidth,
      buttonSize: designObj.buttonSize,
      borderRadius: designObj.borderRadius,
      activeButton: designObj.activeButton,
      textColor: designObj.textColor,
      borderColor: designObj.borderColor,
      backgroundColor: designObj.backgroundColor,
      url: designObj.url
    };
  }

  componentDidUpdate = () => {
    this.props.onDesignChange(this.state);
  }

  onRadioButtonsChange = value => {
    this.setState({ buttonSize: value });
  };

  onBorderWidthChange = value => {
    this.setState({ borderWidth: value });
  };

  onBorderRadiusChange = value => {
    this.setState({ borderRadius: value });
  };



  onButtonSampleClick = index => {
    this.setState({
      activeButton: index,
      borderWidth: parseInt(arr[index].borderWidth),
      borderRadius: parseInt(arr[index].borderRadius),
      textColor: arr[index].color,
      backgroundColor: arr[index].background,
      borderColor: arr[index].borderColor
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
    const sizeOptions = [
      {
        value: 'L', labelText: 'L'
      },
      {
        value: 'M', labelText: 'M'
      },
      {
        value: 'S', labelText: 'S'
      },
    ];
    if (WixUtils.isMobile()) {
      sizeOptions.push({ value: 'F', labelText: 'Full width' });
    }

    const buttonSampleList = arr.map((style, i) => {
      const active = i === this.state.activeButton;
      return (<ButtonSample
        key={i.toString()}
        active={active}
        i={i}
        onClickButton={this.onButtonSampleClick.bind(this)}
        {...this.props}
        style={style}
        state={this.state}
      />);
    });

    return (
      <div className={styles.design_component}>
        <SettingsSection theme={theme} ariaProps={{ 'aria-label': 'button sample selection', role: 'region' }}>
          <div className={classNames(styles.button_samples)}>
            {buttonSampleList}
          </div>
        </SettingsSection>
        <SettingsSection theme={theme} ariaProps={{ 'aria-label': 'size selection', role: 'region' }}>
          <div className={styles.row}>
            <div className={styles.section_header}>
              {t('ButtonModal_Size_Section')}
            </div>
            <RadioGroup
              label={t('ButtonModal_Size_Section')}
              dataSource={sizeOptions}
              value={this.state.buttonSize}
              onChange={this.onRadioButtonsChange.bind(this)}
              theme={theme}
              className={styles.radioItem}
            />
          </div>
        </SettingsSection>
        <SettingsSection theme={theme} ariaProps={{ 'aria-label': 'border selection', role: 'region' }}>
          <div className={styles.row} >
            <div className={styles.section_header}>
              {t('ButtonModal_Border_Section')}
            </div>
            <div>
              <div className={styles.slider_with_input}>
                <SliderWithInput
                  value={parseInt(this.state.borderWidth)}
                  min={0}
                  max={30}
                  label={t('ButtonModal_Width_Input')}
                  onChange={this.onBorderWidthChange.bind(this)}
                  theme={this.styles}
                />
              </div>
              <div className={styles.px_label}>
                px
              </div>
            </div>
            <div className={styles.input_container}>
              <div className={styles.slider_with_input}>
                <SliderWithInput
                  value={parseInt(this.state.borderRadius)}
                  min={0}
                  max={30}
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
            <div className={styles.section_header}>
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
