import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/settings-section.scss';

class SettingsSection extends React.Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { styles } = this;
    const { children, ariaProps, className } = this.props;
    return (
      <div className={classNames(styles.section, className)} {...ariaProps}>
        {children}
      </div>
    );
  }
}

SettingsSection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  theme: PropTypes.object.isRequired,
  ariaProps: PropTypes.object,
};

export default SettingsSection;
