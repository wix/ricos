import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import hexRgb from 'hex-rgb';
import { mergeStyles } from '../../Utils/mergeStyles';
import CustomColorPicker from './CustomColorPicker';
import AddColorIcon from '../../Icons/AddColorIcon';
import styles from '../../../statics/styles/color-picker.scss';

class ColorPicker extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });

    this.state = {
      color: this.props.color,
      rgb: hexRgb(this.props.color),
      isCustomColorPickerOpened: false,
    };

    this.toggleCustomColorPicker = this.toggleCustomColorPicker.bind(this);
  }

  onColorButtonClicked = color => {
    this.setColor(color);
  };

  setColor = color => {
    const selectedColor = color.toUpperCase();
    const index = this.props.palette.indexOf(selectedColor);
    this.setState({
      selectedIndex: index,
      color: selectedColor,
      rgb: hexRgb(selectedColor),
    });
    this.props.onChange(color);
  };

  onCustomColorPickerChanged = color => {
    if (color.hex !== this.state.color) {
      this.setColor(color.hex);
    }
  };

  toggleCustomColorPicker() {
    this.setState(prevState => ({
      isCustomColorPickerOpened: !prevState.isCustomColorPickerOpened,
    }));
  }

  renderColorButtons(colors) {
    const { styles } = this;
    return colors.map((color, index) => (
      <button
        key={`${color}_${index}`}
        className={classNames({
          [styles.colorPicker_button]: true,
          [styles.colorPicker_button_selected]: this.state.color === color,
        })}
        style={{ background: color, '--border-color': color }}
        onClick={this.onColorButtonClicked.bind(this, color)}
      />
    ));
  }

  renderSeparator() {
    const { styles } = this;
    return <hr className={styles.colorPicker_separator} />;
  }

  renderAddColorButton() {
    const { styles } = this;
    return (
      <div key={'add_color_button'}>
        <button
          id={'add_color_button'}
          className={styles.colorPicker_add_color_button}
          onClick={this.toggleCustomColorPicker}
        />
        <label
          tabIndex={0}
          className={styles.colorPicker_add_color_label}
          htmlFor="add_color_button"
        >
          <AddColorIcon />
        </label>
      </div>
    );
  }

  render() {
    const { styles } = this;
    const { isMobile, t, theme } = this.props;
    return (
      <div className={styles.colorPicker}>
        {this.state.isCustomColorPickerOpened ? (
          <CustomColorPicker
            color={this.state.color}
            onChange={this.onCustomColorPickerChanged.bind(this)}
            t={t}
            isMobile={isMobile}
            theme={theme}
          />
        ) : (
          <div className={styles.colorPicker_palette}>
            {this.renderColorButtons(this.props.palette)}
            {this.renderSeparator()}
            {this.renderColorButtons(this.props.userColors)}
            {this.renderAddColorButton()}
          </div>
        )}
      </div>
    );
  }
}

ColorPicker.propTypes = {
  theme: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  palette: PropTypes.arrayOf(PropTypes.string).isRequired,
  userColors: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func,
  isMobile: PropTypes.bool,
};

export default ColorPicker;
