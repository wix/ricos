import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/default-styles.scss';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';

const DEFAULTS = {
  config: {
    size: 'content',
    alignment: 'center'
  },
};

class ButtonComponent extends PureComponent {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { componentData } = this.props;
    const { styles } = this;
    const { className } = this.props;
    const containerClassNames = classNames(styles.button_container, className || '');
    const theme = this.props.theme;
    const buttonName = (!componentData.buttonName) ? 'Click Me!' : componentData.buttonName;
    return (
      <div className={containerClassNames}>
        <button className={theme.button_primary} href={componentData.src}>
          {
            buttonName
          }
        </button>
      </div>
    );
  }
}

ButtonComponent.propTypes = {
  theme: PropTypes.object,
  componentData: PropTypes.object,
  className: PropTypes.object
};

export { ButtonComponent as Component, DEFAULTS };
