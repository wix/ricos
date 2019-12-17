import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/color-toggle-component.scss';

class ColorToggleComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      color: props.color || '#FFF',
      isOpened: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { color } = props;
    return color === state.color ? null : { ...state, color };
  }

  onClicked = () => {
    this.props.toggle(this.props.pickerType);
    this.setState({ isOpened: !this.state.isOpened });
  };

  render() {
    const { isToggle } = this.props;
    const marginButtonClassName = isToggle
      ? this.styles.button_marginBottomOpenedColorPicker
      : this.styles.button_marginBottomClosedColorPicker;
    return (
      <div className={classNames(this.styles.button_colorPicker, marginButtonClassName)}>
        <div className={this.styles.button_colorPicker_label}>{this.props.children}</div>
        <div className={this.styles.button_colorPicker_picker}>
          <button
            style={{ background: this.state.color }}
            className={this.styles.button_colorPicker_pickerButton}
            onClick={this.onClicked}
          />
        </div>
      </div>
    );
  }
}

ColorToggleComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  children: PropTypes.string,
  color: PropTypes.string,
  toggle: PropTypes.func.isRequired,
  marginBottom: PropTypes.string,
  marginButtonClassName: PropTypes.string,
  isToggle: PropTypes.bool,
  pickerType: PropTypes.string.isRequired,
};

export default ColorToggleComponent;
