import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MyColorPicker from './custom-color-picker';
import {
  SliderWithInput,
  RadioGroup,
  SettingsSection,
  mergeStyles,
  WixUtils
} from 'wix-rich-content-common';
import classNames from 'classnames';
import ButtonSample from '../components/button-sample';
import styles from '../../statics/styles/design-component-styles.scss';

class DesignComponent extends PureComponent {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { componentData } = this.props;
    this.state = {
      borderWidth: componentData.borderWidth || 0,
      buttonSize: componentData.buttonSize || 'M',
      borderRadius: componentData.borderRadius || 0,
      activeButton: componentData.activeButton || 0,
    };
  }

  componentDidMount = () => {
    this.props.initailStateHandler(this.state);
  }

  componentDidUpdate = () => {
    // const state = this.state;
    // const initState = this.props.initailState;
    this.props.onDesignChange(this.state);

  }

  onRadioButtonsChange = value => {
    const { componentData, pubsub, onRadioButtonsChange } = this.props;
    if (onRadioButtonsChange) {
      onRadioButtonsChange({ ...componentData, buttonSize: value });
    } else {
      pubsub.update('componentData', { buttonSize: value });
    }
    this.setState({ buttonSize: value });
  };

  onBorderWidthChange = value => {
    const { componentData, pubsub, onBorderWidthChange } = this.props;
    if (onBorderWidthChange) {
      onBorderWidthChange({ ...componentData, borderWidth: value });
    } else {
      pubsub.update('componentData', { borderWidth: value });
    }
    this.setState({ borderWidth: value });
  };

  onBorderRadiusChange = value => {
    const { componentData, pubsub, onBorderRadiusChange } = this.props;
    if (onBorderRadiusChange) {
      onBorderRadiusChange({ ...componentData, borderRadius: value });
    } else {
      pubsub.update('componentData', { borderRadius: value });
    }
    this.setState({ borderRadius: value });
  };



  onButtonSampleClick = index => {
    const { componentData, pubsub, onButtonSampleClick } = this.props;
    if (onButtonSampleClick) {
      onButtonSampleClick({ ...componentData, activeButton: index });
    } else {
      pubsub.update('componentData', { activeButton: index });
    }
    this.setState({ activeButton: index, borderWidth: 0, borderRadius: 0 });
  }

  render() {
    const styles = this.styles;
    const { theme, t } = this.props;
    const { activeButton } = this.state;
    const arr = [
      {
        className: 'button_primary',
        style: {
          border: '0px solid #0261FF',
          borderRadius: '0px',
          borderWidth: '1px',
          // background: '#0261FF',
          // color: 'white'
        }
      },
      {
        className: 'button_secondary',
        style: {
          border: '1px solid #0261FF',
          borderRadius: '0px',
          borderWidth: '1px',
          // background: 'white',
          // color: '#0261FF'
        }
      },
      {
        className: 'button_secondary',
        style: {
          border: '1px solid #0261FF',
          borderRadius: '0px',
          borderWidth: '1px',
          //background: '#BCD4FD',
          // color: '#0261FF'
        }
      },
      {
        className: 'button_secondary',
        style: {
          border: '1px solid #0261FF',
          borderRadius: '10px',
          borderWidth: '1px',
          //background: '#BCD4FD',
          // color: '#0261FF'
        }
      },
      {
        className: 'button_secondary',
        style: {
          border: '1px solid #0261FF',
          borderWidth: '5px',
          borderRadius: '0px',
          // background: 'white',
          // color: '#0261FF'
        }
      },
    ];

    let sizeOptions = [
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
      />);
    });
    let color = {
      hex: '#333',
      rgb: {
        r: 51,
        g: 51,
        b: 51,
        a: 1,
      },
      hsl: {
        h: 0,
        s: 0,
        l: .20,
        a: 1,
      },
    }
    return (
      <div className={styles.design_component}>
        <SettingsSection theme={theme} ariaProps={{ 'aria-label': 'button sample selection', role: 'region' }}>
          <div className={classNames(styles.row, styles.button_samples)}>
            {buttonSampleList}
          </div>
        </SettingsSection>
        <SettingsSection theme={theme} ariaProps={{ 'aria-label': 'size selection', role: 'region' }}>
          <div className={styles.row}>
            {t('ButtonModal_Size_Section')}
            <br /><br />
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
            {t('ButtonModal_Border_Section')}
            <br /><br />
            <SliderWithInput
              value={parseInt(this.state.borderWidth) + parseInt(arr[activeButton].style.borderWidth)}
              min={0}
              max={30}
              label={t('ButtonModal_Width_Input')}
              onChange={this.onBorderWidthChange.bind(this)}
              theme={theme}
            />
            <SliderWithInput
              value={parseInt(this.state.borderRadius) + parseInt(arr[activeButton].style.borderRadius)}
              min={0}
              max={30}
              label={t('ButtonModal_Radius_Input')}
              onChange={this.onBorderRadiusChange.bind(this)}
              theme={theme}
            />
          </div>
        </SettingsSection>
        <SettingsSection theme={theme} ariaProps={{ 'aria-label': 'color selection', role: 'region' }}>
          <div style={{ border: 'none' }} className={styles.row} >
            {t('ButtonModal_Color_Section')}
            <br /><br />
            <MyColorPicker rgb={color.rgb} hex={color.hex} hsl={color.hsl} ></MyColorPicker>
            {/* <ColorPicker {...this.props} colorFor="textColor" theme={theme} initialColor={'white'}>{t('ButtonModal_Text_Color')}</ColorPicker>
            <ColorPicker {...this.props} colorFor="borderColor" theme={theme} initialColor={'#0261FF'}>{t('ButtonModal_Border_Color')}</ColorPicker>
            <ColorPicker
              {...this.props}
              colorFor="backgroundColor"
              theme={theme}
              initialColor={'#B5D1FF'}
            >{t('ButtonModal_Background_Color')}
            </ColorPicker> */}
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

DesignComponent.defaultProps = {
  doneLabel: 'Save',
  cancelLabel: 'Cancel',
};

export default DesignComponent;
