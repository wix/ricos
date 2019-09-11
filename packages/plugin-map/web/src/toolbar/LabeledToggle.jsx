import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/map-settings-modal.scss';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';

export class LabeledToggle extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const {
      label,
      onChange,
      checked,
      sliderColor,
      toggleIsOnTrackColor,
      toggleIsOffTrackColor,
    } = this.props;

    return (
      <div className={this.styles.labeled_toggle_root}>
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
        >
          <div
            className={classNames(this.styles.labeled_toggle_input_container, {
              [this.styles.labeled_toggle_input_container_off]: !checked,
            })}
          >
            <div className={this.styles.labeled_toggle_switch}>
              <span
                className={this.styles.labeled_toggle_track}
                style={{
                  background: checked ? toggleIsOnTrackColor : toggleIsOffTrackColor,
                }}
              />
              <span
                className={
                  checked
                    ? this.styles.labeled_toggle_slider_checked
                    : this.styles.labeled_toggle_slider_unchecked
                }
                style={{
                  background: sliderColor,
                }}
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
  sliderColor: PropTypes.string.isRequired,
  toggleIsOffTrackColor: PropTypes.string.isRequired,
  toggleIsOnTrackColor: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};
