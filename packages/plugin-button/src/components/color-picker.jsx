import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SwatchesPicker } from 'react-color';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/color-picker.scss';

class ColorPicker extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      pickerClicked: false,
      textColor: this.props.initialColor
    };
  }

    onPickerClick = () => {
      this.setState({ pickerClicked: !this.state.pickerClicked });
    };

    handleChangeComplete = (color, lable) => {
      lable === this.setState({ textColor: color.hex });
    };

    handleOnKeyPressed = () => {
      this.setState({ pickerClicked: false });
    };

    render() {
      return (
        <div className={this.styles.color_picker}>
          <div className={this.styles.picker}>
            <button
              style={{ background: this.state.textColor }}
              onClick={this.onPickerClick}
              onKeyDown={this.handleOnKeyPressed}
              className={this.styles.pickerButton}
            />
            {this.state.pickerClicked ?
              <SwatchesPicker
                className={this.styles.swatchesPicker}
                onChangeComplete={this.handleChangeComplete}
                color={this.state.textColor}
              /> :
              null
            }
          </div>
          <div className={this.styles.label}>
            {this.props.children}
          </div>
        </div>
      );
    }
}

ColorPicker.propTypes = {
  theme: PropTypes.object,
  style: PropTypes.object,
  initialColor: PropTypes.string,
  children: PropTypes.string
};
export default ColorPicker;
