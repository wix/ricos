import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
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
    ];
    this.state = {
      pickerClicked: this.props.flag,
      color: this.props.color,
      picker: false,
      dropperColor: '',
      isDropperSelected: false,
      dropperBackColor: '',

    };
  }

  componentWillReceiveProps = () => {
    if (this.state.pickerClicked !== this.props.flag) {
      this.setState({ pickerClicked: this.props.flag });
    }
  }

  componentDidMount = () => {
    if (this.state.color && this.presetColors.indexOf(this.state.color) === -1) {
      this.setState({ dropperBackColor: this.state.color, isDropperSelected: true });
    }
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
    this.setState({ selectedPaletteIndex: index, isDropperSelected: false, dropperBackColor: '' });
    if (color.hex) {
      this.customColorPickerChange(color);
    }
    this.setState({ picker: false });
  }

  onPaletteDropperClick = () => {
    this.onPaletteClick(this.state.color, 5);
    this.setState({ picker: !this.state.picker });
  }

  customColorPickerChange = color => {
    if (this.presetColors.indexOf(color.hex) === -1) {
      this.setState({ isDropperSelected: true, dropperBackColor: color.hex });
    }
    this.props.onChange(color.hex);
    this.setState({ color: color.hex });
  }

  getDarkBrightness = colorRes => {
    let r, g, b;
    let color = colorRes;
    if (color.match(/^rgb/)) {
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
      r = color[1];
      g = color[2];
      b = color[3];
    } else {
      color = +('0x' + color.slice(1).replace(
        color.length < 5 && /./g, '$&$&'));

      r = color >> 16;
      g = color >> 8 & 255;
      b = color & 255;
    }
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


  }

  render() {
    const { flag } = this.props;

    let dropperColor = '';
    let isDropperColor = false;
    if (this.presetColors.indexOf(this.props.color) === -1 || this.presetColors.indexOf(this.props.color) === 5) {
      isDropperColor = true;
    }
    if (this.state.color && this.presetColors.indexOf(this.state.color) === -1) {
      if (this.getDarkBrightness(this.props.color)) {
        dropperColor = '#eef1f6';
      } else {
        dropperColor = '#000000';
      }
    }
    const palattes = this.presetColors.map((color, index) => {
      const backColor = (index !== 5) ? color : this.props.color;
      let active = this.state.selectedPaletteIndex === index;
      if (color === this.props.color) {
        active = true;
      } else {
        active = false;
      }
      return (
        <div
          onClick={this.onPaletteClick.bind(this, color, index)}
          key={color + index}
          style={{ background: backColor }}
          className={classNames(styles.palette)}
        >
          {
            (active || (isDropperColor && index === 5)) &&
            <PickedIcon className={styles.picked} width="11px" height="11px" />
          }
        </div>
      );
    });
    return (
      <div className={styles.container}>
        {this.state.pickerClicked &&
          <div className={styles.overlay} />
        }
        <div className={this.styles.color_picker}>
          <div className={this.styles.label}>
            {this.props.children}
          </div>
          <div className={this.styles.picker}>
            <button
              style={{ background: this.state.color }}
              onClick={this.onPickerClick}
              onKeyDown={this.handleOnKeyPressed}
              className={this.styles.pickerButton}
            />
          </div>
        </div>
        {this.state.pickerClicked ?
          <div className={styles.colorBoard}>
            <div className={styles.palettes}>
              {palattes}
              <div
                onClick={this.onPaletteDropperClick.bind(this)}
                style={{ background: this.state.dropperBackColor }}
                className={classNames(styles.palette)}
              >
                {
                  this.state.isDropperSelected &&
                  <PickedIcon className={styles.picked} width="11px" height="11px" />
                }
                <EyeDropperIcon style={{ color: dropperColor }} className={styles.dropper} />
              </div>
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
  theme: PropTypes.object.isRequired,
  style: PropTypes.object,
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  flag: PropTypes.bool,
  settings: PropTypes.object.isRequired
};

export default ColorPicker;
