import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
// import CustomColorPicker from './CustomColorPicker';
import styles from '../../../statics/styles/custom-color-picker-dialog.scss';

class CustomColorPickerDialog extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.initialColor = props.color;
    this.state = {
      color: props.color,
      CustomColorPicker: false,
    };
    this.onCancel = this.onCancel.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const dummy = '';
    const CustomColorPicker = lazy(() =>
      import(`./lib/CustomColorPicker${dummy}.cjs.jsx`).then(CustomColorPicker => ({
        default: CustomColorPicker.default,
      }))
    );
    this.setState({ CustomColorPicker });
  }

  onChange(color) {
    this.setState({ color });
    this.props.onChange(color);
  }

  onCancel() {
    this.props.onCancel(this.initialColor);
  }

  onUpdate() {
    this.props.onUpdate(this.state.color);
  }

  render() {
    const { styles } = this;
    const { t, isMobile, theme } = this.props;
    const { CustomColorPicker } = this.state;
    return (
      <div className={styles.colorPickerDialog}>
        {CustomColorPicker && (
          <Suspense fallback={<div>Loading...</div>}>
            <CustomColorPicker
              color={this.state.color}
              onChange={this.onChange}
              t={t}
              isMobile={isMobile}
              theme={theme}
            />
          </Suspense>
        )}
        <hr className={styles.colorPickerDialog_separator} />
        <div className={styles.colorPickerDialog_buttons}>
          <button className={styles.colorPickerDialog_button} onClick={this.onCancel}>
            {t('ColorPickerButtonLabel_Cancel')}
          </button>
          <button
            className={classNames(
              styles.colorPickerDialog_button,
              styles.colorPickerDialog_button_update
            )}
            onClick={this.onUpdate}
          >
            {t('ColorPickerButtonLabel_Update')}
          </button>
        </div>
      </div>
    );
  }
}

CustomColorPickerDialog.propTypes = {
  t: PropTypes.func,
  color: PropTypes.string,
  isMobile: PropTypes.bool,
  theme: PropTypes.object,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default CustomColorPickerDialog;
