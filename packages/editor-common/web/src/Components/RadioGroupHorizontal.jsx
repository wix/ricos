import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RadioGroup from './RadioGroup';
import Tooltip from './Tooltip';
import InfoIcon from '../Icons/InfoIcon.svg';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/radio-group-horizontal.scss';

class RadioGroupHorizontal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.id = `h_group_${Math.floor(Math.random() * 9999)}`;
  }

  render() {
    const { label, inline, contentForInfoIcon, ...props } = this.props;
    const { styles } = this;
    const groupClassName = classNames(
      styles.radioGroupHorizontal_group,
      inline && styles.radioGroupHorizontal_groupInline,
      !inline && styles.radioGroupHorizontal_groupTwoColumns
    );
    return (
      <div>
        <div className={styles.infoContainer}>
          {label ? (
            <span id={`${this.id}_label`} className={styles.radioGroupHorizontal_title}>
              {label}
            </span>
          ) : null}
          {contentForInfoIcon && (
            <Tooltip shouldRebuildOnUpdate={() => true} content={contentForInfoIcon}>
              <InfoIcon className={styles.infoIcon} />
            </Tooltip>
          )}
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
  contentForInfoIcon: PropTypes.string,
};

export default RadioGroupHorizontal;
