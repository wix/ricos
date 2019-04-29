import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from '../../Utils/mergeStyles';
import CustomColorPickerDialog from './CustomColorPickerDialog';
import AddColorIcon from '../../Icons/AddColorIcon';
import styles from '../../../statics/styles/color-picker.scss';

class ColorPicker extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.id = `cpk_${Math.floor(Math.random() * 9999)}`;

    this.state = {
      color: this.props.color,
      isCustomColorPickerOpened: false,
    };

    this.toggleCustomColorPicker = this.toggleCustomColorPicker.bind(this);
    this.onCustomColorUpdate = this.onCustomColorUpdate.bind(this);
    this.onCustomColorCancel = this.onCustomColorCancel.bind(this);
    this.onCustomColorPicked = this.onCustomColorPicked.bind(this);
  }

  onColorButtonClicked = color => {
    this.setColor(color);
  };

  setColor = color => {
    const selectedColor = color.toUpperCase();
    this.setState({
      color: selectedColor,
    });
    this.props.onChange(selectedColor);
  };

  onCustomColorPicked = color => {
    this.props.onCustomColorPicked(color);
  };

  onCustomColorUpdate(color) {
    if (color !== this.state.color) {
      this.props.onColorAdded(color);
    }
    this.setColor(color);
    this.toggleCustomColorPicker();
  }

  onCustomColorCancel(color) {
    this.setColor(color);
    this.toggleCustomColorPicker();
  }

  toggleCustomColorPicker() {
    this.setState(prevState => ({
      isCustomColorPickerOpened: !prevState.isCustomColorPickerOpened,
    }));
  }

  renderColorButtons(colors) {
    const { styles } = this;
    const { selectionColor } = this.props;
    return colors.map((color, index) => (
      <button
        title={color}
        key={`${color}_${index}`}
        className={classNames({
          [styles.colorPicker_button]: true,
          [styles.colorPicker_button_selected]: this.state.color === color.toUpperCase(),
        })}
        style={{ background: color, '--border-color': selectionColor }}
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
      <div key={`add_color_button_${this.id}`} className={styles.colorPicker_add_color_button}>
        <button
          id={`add_color_button_${this.id}`}
          className={styles.colorPicker_add_color_button_hidden}
          onClick={this.toggleCustomColorPicker}
        />
        <label
          tabIndex={0}
          className={styles.colorPicker_add_color_label}
          htmlFor={`add_color_button_${this.id}`}
        >
          <AddColorIcon style={{ transform: 'scale(0.72)' }} />
        </label>
      </div>
    );
  }

  render() {
    const { styles } = this;
    const { t, isMobile, theme } = this.props;
    return (
      <div className={styles.colorPicker}>
        {this.state.isCustomColorPickerOpened ? (
          this.props.onCustomPickerToggle({
            color: this.state.color,
            onCustomColorPicked: this.onCustomColorPicked,
            onCustomColorCancel: this.onCustomColorCancel,
            onCustomColorUpdate: this.onCustomColorUpdate,
            t,
            isMobile,
            theme,
          })
        ) : (
          <div className={styles.colorPicker_palette}>
            <div className={styles.colorPicker_buttons_container}>
              {this.renderColorButtons(this.props.palette)}
            </div>
            {this.renderSeparator()}
            <div className={styles.colorPicker_buttons_container}>
              {this.renderColorButtons(this.props.userColors)}
              {this.renderAddColorButton()}
            </div>
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
  onColorAdded: PropTypes.func.isRequired,
  onCustomPickerToggle: PropTypes.func,
  onCustomColorPicked: PropTypes.func,
  isMobile: PropTypes.bool,
  selectionColor: PropTypes.string,
};

const DefaultColorPicker = ({
  color,
  onCustomColorPicked,
  onCustomColorCancel,
  onCustomColorUpdate,
  ...props
}) => (
  <CustomColorPickerDialog
    color={color}
    onChange={onCustomColorPicked}
    onUpdate={onCustomColorUpdate}
    onCancel={onCustomColorCancel}
    {...props}
  />
);

DefaultColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  onCustomColorPicked: PropTypes.func,
  onCustomColorCancel: PropTypes.func,
  onCustomColorUpdate: PropTypes.func,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  theme: PropTypes.object.isRequired,
};

ColorPicker.defaultProps = {
  onCustomPickerToggle: props => <DefaultColorPicker {...props} />,
  onCustomColorPicked: () => {},
};

export default ColorPicker;
