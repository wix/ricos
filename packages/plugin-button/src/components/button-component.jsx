import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/default-styles.scss';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';

class ButtonComponent extends PureComponent {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { componentData, className, theme } = this.props;
    const { styles } = this;
    const containerClassNames = classNames(styles.button_container, className || '');
    const buttonName = (!componentData.buttonName) ? 'Click Me!' : componentData.buttonName;
    const buttonStyle = componentData.buttonStyle;
    const target = (componentData.targetBlank) ? '_blank' : '_self';
    const nofollow = (componentData.nofollow) ? 'nofollow' : '';
    const sizes = {
      L: {
        paddingLeft: '61px',
        paddingRight: '61px'
      },
      M: {
        paddingLeft: '42px',
        paddingRight: '42px'
      },
      S: {
        paddingLeft: '16px',
        paddingRight: '16px'
      },
      F: {
        paddingLeft: '0px',
        paddingRight: '0px',
        width: 'calc(100vw - 58px)',
        textAlign: 'center'
      }
    };
    let style = {
    };
    if (buttonStyle) {
      style = {
        border: buttonStyle.style.border,
        borderRadius: buttonStyle.style.borderRadius,
        borderWidth: buttonStyle.style.borderWidth,
        background: buttonStyle.style.background,
        color: buttonStyle.style.color,
      };
    }
    if (componentData.buttonSize) {
      style = {
        ...style,
        ...sizes[componentData.buttonSize]
      };
    } else {
      style = {
        ...style,
        ...sizes.M
      };
    }
    if (componentData.borderWidth) {
      style = {
        ...style,
        borderWidth: componentData.borderWidth + 'px'
      };
    }
    if (componentData.borderRadius) {
      style = {
        ...style,
        borderRadius: componentData.borderRadius
      };
    }
    if (componentData.color && componentData.colorFor === 'textColor') {
      style = {
        ...style,
        color: componentData.color
      };
    }
    if (componentData.color && componentData.colorFor === 'backgroundColor') {
      style = {
        ...style,
        background: componentData.color
      };
    }
    if (componentData.color && componentData.colorFor === 'borderColor') {
      style = {
        ...style,
        borderColor: componentData.color
      };
    }
    const styleClassName = (buttonStyle) ? buttonStyle.className : 'button_primary';
    return (
      <a
        className={classNames(theme[styleClassName], containerClassNames)}
        href={componentData.url}
        style={style}
        target={target}
        rel={nofollow}
      >
        {
          buttonName
        }
      </a>
    );
  }
}

ButtonComponent.propTypes = {
  theme: PropTypes.object,
  componentData: PropTypes.object,
  className: PropTypes.string
};

export default ButtonComponent;
