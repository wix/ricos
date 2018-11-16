import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/default-styles.scss';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';

class ButtonComponent extends PureComponent {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { componentData } = this.props;
    this.state = {
      style: componentData.button,
    };
  }

  render() {
    const { componentData, className } = this.props;
    const { styles } = this;
    const containerClassNames = classNames(styles.button_container, className || '');
    let buttonText = (!componentData.button) ? 'Click Me!' : componentData.button.buttonText;
    let rel = '';
    let url = '';
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
      border: '0px solid blue',
      ...this.props.style
    };
    const target = (componentData.button.target) ? '_blank' : '_self';
    rel = (componentData.button.rel) ? 'nofollow' : '';
    style = {
      ...style,
      ...sizes[componentData.button.buttonSize],
      borderWidth: componentData.button.borderWidth + 'px',
      borderRadius: componentData.button.borderRadius,
      color: componentData.button.textColor,
      background: componentData.button.backgroundColor,
      borderColor: componentData.button.borderColor
    };
    url = componentData.button.url;
    const { buttonObj } = this.props;
    if (buttonObj) {
      style = {
        ...style,
        ...sizes[buttonObj.design.buttonSize],
        borderWidth: buttonObj.design.borderWidth + 'px',
        borderRadius: buttonObj.design.borderRadius,
        color: buttonObj.design.textColor,
        background: buttonObj.design.backgroundColor,
        borderColor: buttonObj.design.borderColor
      };
      buttonText = buttonObj.data.buttonText;
    }
    return (
      <a
        className={containerClassNames}
        href={url}
        style={style}
        target={target}
        rel={rel}
      >
        {
          buttonText
        }
      </a>
    );
  }
}

ButtonComponent.propTypes = {
  theme: PropTypes.object,
  componentData: PropTypes.object,
  style: PropTypes.object,
  buttonObj: PropTypes.object,
  className: PropTypes.string
};

export default ButtonComponent;
