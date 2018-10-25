import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SliderWithInput, RadioGroup, SettingsSection, mergeStyles } from 'wix-rich-content-common';
import classNames from 'classnames';
import ColorPicker from '../components/color-picker';
import ButtonSample from '../components/button-sample';
import styles from '../../statics/styles/design-component-styles.scss';


const arr = [
  {
    border: '1px solid #0261FF',
    background: '#0261FF',
    color: 'white',
    borderRadius: '0px'
  },
  {
    border: '1px solid #0261FF',
    background: 'white',
    color: '#0261FF',
    borderRadius: '0px'
  },
  {
    border: '1px solid #0261FF',
    background: '#B5D1FF',
    color: '#0261FF',
    borderRadius: '0px'
  },
  {
    border: '1px solid #0261FF',
    background: '#B5D1FF',
    color: '#0261FF',
    borderRadius: '8px'
  },
  {
    border: '5px solid #0261FF',
    background: 'white',
    color: '#0261FF',
    borderRadius: '0px'
  },
];

class DesignComponent extends PureComponent {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { componentData } = this.props;
    this.state = {
      width: componentData.width || 20,
      buttonSize: componentData.buttonSize || 'M',
    };
  }

    onRadioButtonsChange = value => {
      this.setState({ buttonSize: value });
    };

    onSliderStatusChange = value => {
      this.setState({ textSize: value });
    };

    render() {
      const styles = this.styles;
      const { theme, t } = this.props;
      const sizeOptions = [
        { value: 'L', labelText: 'L' },
        { value: 'M', labelText: 'M' },
        { value: 'S', labelText: 'S' },
      ];
      return (
        <div className={styles.design_component}>
          <SettingsSection theme={theme} ariaProps={{ 'aria-label': 'button sample selection', role: 'region' }}>
            <div className={classNames(styles.row, styles.button_samples)}>
              <ButtonSample style={arr[0]} />
              <ButtonSample style={arr[1]} />
              <ButtonSample style={arr[2]} />
              <ButtonSample style={arr[3]} />
              <ButtonSample style={arr[4]} />
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
                value={parseInt(this.state.width, 10)}
                min={0}
                max={30}
                label={t('ButtonModal_Width_Input')}
                onChange={this.onSliderStatusChange.bind(this)}
                theme={theme}
              />
              <SliderWithInput
                value={10}
                min={0}
                max={30}
                label={t('ButtonModal_Height_Input')}
                onChange={this.onSliderStatusChange.bind(this)}
                theme={theme}
              />
            </div>
          </SettingsSection>
          <SettingsSection theme={theme} ariaProps={{ 'aria-label': 'color selection', role: 'region' }}>
            <div style={{ border: 'none' }} className={styles.row} >
              {t('ButtonModal_Color_Section')}
              <br /><br />
              <ColorPicker theme={theme} initialColor={'white'}>{t('ButtonModal_Text_Color')}</ColorPicker>
              <ColorPicker theme={theme} initialColor={'#0261FF'}>{t('ButtonModal_Border_Color')}</ColorPicker>
              <ColorPicker theme={theme} initialColor={'#B5D1FF'}>{t('ButtonModal_Background_Color')}</ColorPicker>
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
