import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import PickedIcon from './../icons/pickedIcon';
import CustomColorPicker from './custom-color-picker';
import styles from '../../statics/styles/color-picker.scss';
import EyeDropperIcon from './../icons/EyeDropperIcon';

class ColorPicker extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { colors } = this.props.settings;
    this.presetColors = [
      colors.color_1,
      colors.color_5,
      colors.color_8,
      colors.color_7,
      colors.color_6,
      colors.color_10
    ];

    this.state = {
      color: this.props.color,
      rgb: this.hexToRGB(this.props.color),
      isOpened: this.props.isOpened,
      isCustomColorPickerOpened: false,
      selectedIndex: this.presetColors.indexOf(this.props.color.toUpperCase())
    };

  }

  componentWillReceiveProps = nextProps => {
    if (this.state.isOpened !== nextProps.isOpened) {
      this.setState({ isOpened: nextProps.isOpened });
    }
  }

  onPickerClicked = () => {
    this.setState({ isOpened: !this.state.isOpened, isCustomColorPickerOpened: !this.state.isOpened && this.state.isCustomColorPickerOpened });
    this.props.onClick(this.props.index);
  }

  onColorButtonClicked = index => {
    if (index !== -1) {
      this.setColor(this.presetColors[index]);
    } else {
      this.setState({ isCustomColorPickerOpened: !this.state.isCustomColorPickerOpened });
    }
  }

  setColor = color => {
    const selectedColor = color.toUpperCase();
    const index = this.presetColors.indexOf(selectedColor);
    this.setState({ selectedIndex: index, color: selectedColor, rgb: this.hexToRGB(selectedColor) });
    this.props.onChange(selectedColor);
  }

  onCustomColorPickerChanged = color => {
    if (color.hex !== this.state.color) {
      this.setColor(color.hex);
    }
  }

  hexToRGB = hex => {
    let hexNumber = hex.substr(1);
    const rgb = [];
    while (hexNumber.length) {
      const color = hexNumber.substr(0, 2);
      hexNumber = hexNumber.substr(2);
      const dec = parseInt(color, 16);
      rgb.push(dec);
    }
    return { r: rgb[0], g: rgb[1], b: rgb[2] };
  }

  getDarkBrightness = rgb => {
    if (rgb) {
      const { r, g, b } = rgb;
      const hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
      );
      if (hsp > 127.5) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  handleKeyPress = () => {
    return false;
  };




  render() {
    const { colorPickerRef } = this.props;
    let dropperColor = '';
    if (this.state.selectedIndex === -1) {
      if (this.getDarkBrightness(this.state.rgb)) {
        dropperColor = '#eef1f6';
      } else {
        dropperColor = '#000000';
      }
    }
    const colorsButtons = this.presetColors.map((color, index) => {
      return (
        <div
          role="button"
          tabIndex={index}
          onKeyPress={this.handleKeyPress.bind(this)}
          key={color + index}
          className={classNames(styles.non_dropper_palette)}
          style={{ background: color }}
          onClick={this.onColorButtonClicked.bind(this, index)}
        >
          {this.state.selectedIndex === index &&
            <PickedIcon className={styles.picked} width="12px" height="12px" />
          }
        </div>
      );
    });
    const dropperStyle = (this.state.selectedIndex < 0) ? { background: this.state.color } : {};
    return (
      <div ref={colorPickerRef} className={styles.container}>
        {this.state.isOpened &&
          <div className={styles.overlay} />
        }
        <div className={this.styles.color_picker}>
          <div className={this.styles.label}>
            {this.props.children}
          </div>
          <div className={this.styles.picker}>
            <button
              style={{ background: this.state.color }}
              className={this.styles.pickerButton}
              onClick={this.onPickerClicked}
            />
          </div>
        </div>
        {this.state.isOpened &&
          <div className={styles.colorBoard}>
            <div className={styles.palettes}>
              {colorsButtons}
              <div
                role="button"
                tabIndex="0"
                onKeyPress={this.handleKeyPress.bind(this, this.state.color)}
                onClick={this.onColorButtonClicked.bind(this, -1)}
                style={dropperStyle}
                className={classNames(styles.dropper_palette)}
              >
                {
                  this.state.selectedIndex < 0 &&
                  <PickedIcon className={styles.picked} width="12px" height="12px" />
                }
                <EyeDropperIcon style={{ color: dropperColor }} className={styles.dropper} />
              </div>
            </div>
            {this.state.isCustomColorPickerOpened &&
              <CustomColorPicker color={this.state.color} onChange={this.onCustomColorPickerChanged.bind(this)} t={this.props.t} />
            }
          </div>
        }
      </div>
    );
  }
}

ColorPicker.propTypes = {
  theme: PropTypes.object.isRequired,
  style: PropTypes.object,
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  isOpened: PropTypes.bool,
  settings: PropTypes.object.isRequired,
  t: PropTypes.func,
  index: PropTypes.number,
  scrollColorPickerDown: PropTypes.func,
  colorPickerRef: PropTypes.func
};

export default ColorPicker;
