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
      index: props.index || 0,
      isOpened: false,
    };
  }

  onClicked = () => {
    this.props.toggle(this.state.index, !this.state.isOpened);
    this.setState({ isOpened: !this.state.isOpened });
  };

  render() {
    const { marginButtonClassName } = this.props;
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
  index: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
  marginBottom: PropTypes.string,
  marginButtonClassName: PropTypes.string,
};

export default ColorToggleComponent;
