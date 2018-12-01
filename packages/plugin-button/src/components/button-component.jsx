import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/default-styles.scss';
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
    const { colors } = this.props.settings;
    const { componentData, buttonObj, anchorTarget, relValue } = this.props;
    const { styles } = this;
    let buttonText = (!componentData.button) ? 'Click Me!' : componentData.button.buttonText;
    let rel = '';
    let url = '';
    const sizes = {
      L: {
        width: '156px'
      },
      M: {
        width: '118px'
      },
      S: {
        width: '66px'
      },
      F: {
        width: 'calc(100vw - 82px)',
      }
    };
    let style = {
      border: '0px solid blue',
      ...this.props.style
    };
    const target = (componentData.button.target) ? anchorTarget : '_self';
    rel = (componentData.button.rel) ? relValue : '';
    style = {
      ...style,
      borderWidth: componentData.button.borderWidth + 'px',
      borderRadius: componentData.button.borderRadius,
      color: componentData.button.textColor ? componentData.button.textColor : colors.color_1,
      background: componentData.button.backgroundColor ? componentData.button.backgroundColor : colors.color_8,
      borderColor: componentData.button.borderColor ? componentData.button.borderColor : colors.color_8
    };
    url = componentData.button.url;
    let buttonSize = {
      ...sizes[componentData.button.buttonSize],
    };
    if (buttonObj) {
      style = {
        ...style,
        borderWidth: buttonObj.design.borderWidth + 'px',
        borderRadius: buttonObj.design.borderRadius,
        color: buttonObj.design.textColor,
        background: buttonObj.design.backgroundColor,
        borderColor: buttonObj.design.borderColor
      };
      buttonText = buttonObj.data.buttonText;
      buttonSize = {
        ...buttonSize,
        ...sizes[buttonObj.design.buttonSize]
      };
    }

    return (
      <a
        className={styles.button_container}
        href={url}
        style={style}
        target={target}
        rel={rel}
      >
        <div className={styles.button_text} style={buttonSize}>
          {
            buttonText
          }
        </div>
      </a>
    );
  }
}

ButtonComponent.propTypes = {
  theme: PropTypes.object,
  componentData: PropTypes.object,
  style: PropTypes.object,
  buttonObj: PropTypes.object,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  settings: PropTypes.object,
};

export default ButtonComponent;
