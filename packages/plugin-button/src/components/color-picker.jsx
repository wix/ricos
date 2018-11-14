import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { mergeStyles } from 'wix-rich-content-common';
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
    this.customColorPickerChange(color);
    if (index === 5) {
      this.setState({ picker: !this.state.picker });
    }
  }

  customColorPickerChange = color => {
    this.props.onChange(color.hex);
    this.setState({ color: color.hex });
  }

  render() {
    const { flag } = this.props;
    const colors = [
      '#ffffff',
      '#040404',
      '#0261ff',
      '#b5d1ff',
      '#23d6b5',
      this.state.color
    ];
    const palattes = colors.map((color, index) => {
      const backColor = (index === 5) ? this.state.color : color;
      return (
        <button
          key={color + index}
          className={styles.palette}
          onClick={this.onPaletteClick.bind(this, color, index)}
          style={{ background: backColor }}
        >
          { (index === 5) ?
            <EyeDropperIcon className={styles.dropper} /> :
            null
          }
        </button>
      );
    });
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
        {this.state.pickerClicked && flag ?
          <div className={styles.colorBoard}>
            <div className={styles.palettes}>
              {palattes}
            </div>
            {this.state.picker && flag ?
              <div className={styles.checkboard}>
                <CustomColorPicker color={this.state.color} onChange={this.customColorPickerChange.bind(this)} />
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
  children: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  flag: PropTypes.bool,
};

export default ColorPicker;
