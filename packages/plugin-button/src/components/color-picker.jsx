import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SwatchesPicker } from 'react-color';
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
      colorFor: componentData.colorFor || ''
    };
  }

  onPickerClick = () => {
    this.setState({ pickerClicked: !this.state.pickerClicked });
  };

  onFocusOut = () => {
    this.setState({ pickerClicked: false });
  };

  handleChangeComplete = (color, lable) => {
    const { componentData, pubsub, handleChangeComplete, colorFor } = this.props;
    if (handleChangeComplete) {
      handleChangeComplete({ ...componentData, color: color.hex, colorFor });
    } else {
      pubsub.update('componentData', { color: color.hex, colorFor});
    }

    lable === this.setState({ color: color.hex, pickerClicked: false });
  };

  handleOnKeyPressed = () => {
    this.setState({ pickerClicked: false });
  };

  render() {
    return (
      <div className={this.styles.color_picker}>
        <div className={this.styles.picker}>
          <button
            style={{ background: this.state.color }}
            onClick={this.onPickerClick}
            onKeyDown={this.handleOnKeyPressed}
            className={this.styles.pickerButton}
          />
          {this.state.pickerClicked ?
            <div onBlur={this.onFocusOut}>
              <SwatchesPicker
                className={this.styles.swatchesPicker}
                onChangeComplete={this.handleChangeComplete}
                color={this.state.color}
              />
            </div> :
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
