import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { RadioGroup, InfoIcon } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/radio-group-horizontal.scss';
import generalstyles from 'wix-rich-content-editor-common/dist/statics/styles/general.scss';

class RadioGroupHorizontal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.id = `h_group_${Math.floor(Math.random() * 9999)}`;
  }

  render() {
    const { label, inline, tooltipTextKey, t, ...props } = this.props;
    const { styles } = this;
    const groupClassName = classNames(
      styles.radioGroupHorizontal_group,
      inline && styles.radioGroupHorizontal_groupInline,
      !inline && styles.radioGroupHorizontal_groupTwoColumns
    );

    return (
      <div>
        <div className={generalstyles.infoContainer}>
          {label ? (
            <span id={`${this.id}_label`} className={styles.radioGroupHorizontal_title}>
              {label}
            </span>
          ) : null}
          {tooltipTextKey && <InfoIcon tooltipText={t(tooltipTextKey)} />}
        </div>
        <RadioGroup ariaLabelledBy={`${this.id}_label`} {...props} className={groupClassName} />
      </div>
    );
  }
}

RadioGroupHorizontal.propTypes = {
  label: PropTypes.string,
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  tooltipTextKey: PropTypes.string,
  t: PropTypes.func,
};

export default RadioGroupHorizontal;
