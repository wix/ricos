import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { mergeStyles } from 'wix-rich-content-common';
import PickedIcon from './../icons/pickedIcon';
import CustomColorPicker from './custom-color-picker';
import styles from '../../statics/styles/color-picker.scss';
import EyeDropperIcon from './../icons/EyeDropperIcon';

class ColorPicker extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      pickerClicked: false,
      color: this.props.color,
      picker: false
    };
  }

  componentDidUpdate = () => {
    if (!isEqual(this.state.color, this.props.color)) {
      this.setState({ color: this.props.color });
    }
  }

  onPickerClick = () => {
    this.props.onClick();
    this.setState({ pickerClicked: !this.state.pickerClicked });
  };


  handleOnKeyPressed = () => {
    this.setState({ pickerClicked: false });
  };

  onPaletteClick = (result, index) => {
    const color = {
      hex: result
    };
    this.setState({ selectedPaletteIndex: index });
    this.customColorPickerChange(color);
    if (index === 5) {
      this.setState({ picker: !this.state.picker, active: false });
    }
  }

  customColorPickerChange = color => {
    this.props.onChange(color.hex);
    this.setState({ color: color.hex });
  }

  render() {
    const { flag, colors } = this.props;
    const presetColors = [
      colors.color_1,
      colors.color_5,
      colors.color_8,
      colors.color_7,
      '#23D6B5',
      this.props.color
    ];
    let isDropperColor = false;
    if (presetColors.indexOf(this.props.color) === -1 || presetColors.indexOf(this.props.color) === 5) {
      isDropperColor = true;
    }
    const palattes = presetColors.map((color, index) => {
      const backColor = (index !== 5) ? color : this.props.color;
      const className = styles.palette;
      let active = this.state.selectedPaletteIndex === index;
      let isColor = false;
      if (color === this.props.color && index !== 5) {
        isColor = true;
      } else {
        isColor = false;
      }
      if (isDropperColor && index === 5) {
        isColor = false;
        active = false;
      }
      return (
        <button onClick={this.onPaletteClick.bind(this, color, index)} key={color + index} style={{ background: backColor }} className={className}>
          {
            (active || isColor || (isDropperColor && index === 5)) &&
            <PickedIcon className={styles.picked} width="11px" height="11px" />
          }
          {(index === 5) ?
            <EyeDropperIcon className={styles.dropper} /> : null
          }
        </button>
      );
    });
    return (
      <div className={styles.container}>
        {((this.state.pickerClicked && flag) || flag) &&
          <div className={styles.overlay} />
        }

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
        {(this.state.pickerClicked && flag) || flag ?
          <div className={styles.colorBoard}>
            <div className={styles.palettes}>
              {palattes}
            </div>
            {this.state.picker && flag ?
              <CustomColorPicker color={this.state.color} onChange={this.customColorPickerChange.bind(this)} /> : null
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
  children: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  flag: PropTypes.bool,
  colors: PropTypes.object
};

export default ColorPicker;
