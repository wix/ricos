import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/labeled-toggle.scss';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';

export default class LabeledToggle extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { label, onChange, checked, style, dataHook } = this.props;

    return (
      <div className={this.styles.labeled_toggle_root} style={style}>
        <div
          role="button"
          tabIndex="0"
          onClick={onChange}
          onKeyPress={e => e.key === 'Enter' && onChange()}
          className={this.styles.labeled_toggle_label_wrapper}
        >
          <p className={this.styles.labeled_toggle_label}>{label}</p>
        </div>
        <div
          className={this.styles.labeled_toggle_input_root}
          onClick={onChange}
          tabIndex={-1}
          onKeyPress={null}
          role="button"
          data-hook={dataHook}
        >
          <div
            className={classNames(this.styles.labeled_toggle_input_container, {
              [this.styles.labeled_toggle_input_container_checked]: checked,
            })}
          >
            <div className={this.styles.labeled_toggle_switch}>
              <span
                className={classNames(this.styles.labeled_toggle_track, {
                  [this.styles.labeled_toggle_track_checked]: checked,
                })}
              />
              <span
                className={classNames(
                  this.styles.labeled_toggle_slider,
                  checked
                    ? this.styles.labeled_toggle_slider_checked
                    : this.styles.labeled_toggle_slider_unchecked
                )}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LabeledToggle.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  style: PropTypes.object,
  dataHook: PropTypes.string,
};
