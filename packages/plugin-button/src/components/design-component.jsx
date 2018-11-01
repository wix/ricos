import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  SliderWithInput,
  RadioGroup,
  SettingsSection,
  mergeStyles,
  SettingsPanelFooter
} from 'wix-rich-content-common';
import classNames from 'classnames';
import ColorPicker from '../components/color-picker';
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
      activeButton: 0
    };
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

  onConfirm = () => {
    const { buttonSize } = this.state;
    const { componentData, pubsub, onConfirm, onCloseRequested } = this.props;
    if (onConfirm) {
      onConfirm({ ...componentData, buttonSize });
    } else {
      pubsub.update('componentData', { buttonSize });
    }
    onCloseRequested();


    this.setState({ submitted: true });
  };

  onButtonSampleClick = index => {
    this.setState({ activeButton: index });
  }

  render() {
    const styles = this.styles;
    const { theme, t, doneLabel, cancelLabel } = this.props;
    const arr = [
      {
        className: 'button_primary',
        style: {
          borderRadius: '0px',
          borderWidth: '1px',
        }
      },
      {
        className: 'button_secondary',
        style: {
          borderRadius: '0px',
          borderWidth: '1px',
        }
      },
      {
        className: 'button_secondary',
        style: {
          borderRadius: '0px',
          borderWidth: '1px',
        }
      },
      {
        className: 'button_secondary',
        style: {
          borderRadius: '10px',
          borderWidth: '1px',
        }
      },
      {
        className: 'button_secondary',
        style: {
          borderWidth: '5px',
          borderRadius: '0px',
        }
      },
    ];
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
    const buttonSampleList = arr.map((style, i) => {
      const active = (i === this.state.activeButton) ? true : false;
      return (<ButtonSample
        key={i.toString()}
        active={active}
        i={i}
        onClickButton={this.onButtonSampleClick.bind(this)}
        {...this.props}
        style={style}
      />);
    });
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
              value={parseInt(this.state.borderWidth, 10)}
              min={0}
              max={30}
              label={t('ButtonModal_Width_Input')}
              onChange={this.onBorderWidthChange.bind(this)}
              theme={theme}
            />
            <SliderWithInput
              value={parseInt(this.state.borderRadius, 10)}
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
            <ColorPicker {...this.props} colorFor="textColor" theme={theme} initialColor={'white'}>{t('ButtonModal_Text_Color')}</ColorPicker>
            <ColorPicker {...this.props} colorFor="borderColor" theme={theme} initialColor={'#0261FF'}>{t('ButtonModal_Border_Color')}</ColorPicker>
            <ColorPicker
              {...this.props}
              colorFor="backgroundColor"
              theme={theme}
              initialColor={'#B5D1FF'}
            >{t('ButtonModal_Background_Color')}
            </ColorPicker>
          </div>
        </SettingsSection>
        <SettingsPanelFooter
          className={styles.modal_footer}
          save={() => this.onConfirm()}
          cancel={() => this.props.onCloseRequested()}
          saveLabel={doneLabel}
          cancelLabel={cancelLabel}
          theme={theme}
          t={t}
        />
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
