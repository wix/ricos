import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CustomColorPicker from './custom-color-picker';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/color-picker.scss';

class ColorPicker extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { componentData } = this.props;
    this.state = {
      pickerClicked: false,
      color: componentData.color || this.props.initialColor,
      colorFor: componentData.colorFor || '',
      chromePicker: false
    };
  }

  onPickerClick = () => {
    this.setState({ pickerClicked: !this.state.pickerClicked });
  };

  handleChangeComplete = (color, lable) => {
    const { componentData, pubsub, handleChangeComplete, colorFor } = this.props;
    if (handleChangeComplete) {
      handleChangeComplete({ ...componentData, color: color.hex, colorFor });
    } else {
      pubsub.update('componentData', { color: color.hex, colorFor });
    }

    lable === this.setState({ color: color.hex, pickerClicked: false });
  };

  handleOnKeyPressed = () => {
    this.setState({ pickerClicked: false });
  };

  onPaletteClick = (color, index) => {
    console.log(color, index);
    if (index === 5) {
      this.setState({ chromePicker: !this.state.chromePicker });
    }
  }
  render() {
    const colors = [
      '#ffffff',
      '#040404',
      '#0261ff',
      '#b5d1ff',
      '#23d6b5',
      'none'
    ];

    const palattes = colors.map((color, index) => {
      return (
        <div className={styles.palette} onClick={this.onPaletteClick.bind(this, color, index)} style={{ background: color }}>
        </div>
      );
    })
    const customPickerStyle = {
      input:{
        display: 'none'
      },
      label:{
        display: 'none',
      }
    }
    return (
      <div>
        <div className={this.styles.color_picker}>
          <div className={this.styles.picker}>
            <button
              style={{ background: this.state.color }}
              onClick={this.onPickerClick}
              onKeyDown={this.handleOnKeyPressed}
              className={this.styles.pickerButton}
            />
          </div>
          <div className={this.styles.label}>
            {this.props.children}
          </div>
        </div>
        {this.state.pickerClicked ?
          <div className={styles.colorBoard}>
            <div className={styles.palettes}>
              {palattes}
            </div>
            {this.state.chromePicker ?
              <div className={styles.checkboard}>
              <CustomColorPicker/>
              </div> :
              null
            }

          </div> : null
        }
      </div>
    );
  }
}

ColorPicker.propTypes = {
  theme: PropTypes.object,
  style: PropTypes.object,
  initialColor: PropTypes.string,
  children: PropTypes.string,
  componentData: PropTypes.object,
  pubsub: PropTypes.object,
  onConfirm: PropTypes.func,
  colorFor: PropTypes.string,
  handleChangeComplete: PropTypes.func
};
export default ColorPicker;
