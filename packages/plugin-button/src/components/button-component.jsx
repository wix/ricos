import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ErrorIcon } from 'wix-rich-content-common';
import styles from '../../statics/styles/default-styles.scss';
import ButtonViewer from './button-viewer';


class ButtonComponent extends PureComponent {

  constructor(props) {
    super(props);
    const { componentData: { button } } = this.props;
    this.state = {
      style: button,
    };
    this.buttonName = 'Click Me!';
  }

  render() {
    const { colors } = this.props.settings;
    const { componentData: { button }, buttonObj, anchorTarget, relValue, t, theme } = this.props;
    let buttonText = button.buttonText || this.buttonName;
    let rel = '';
    let url = '';
    let style = {
      border: '0px solid blue',
      ...this.props.style
    };

    const target = (typeof (button.target) === 'undefined') ?
      anchorTarget :
      (button.target) ?
        '_blank' :
        '_self';
    rel = (typeof (button.rel) === 'undefined') ?
      relValue :
      (button.rel) ?
        'nofollow' :
        '';
    style = {
      ...style,
      borderWidth: button.borderWidth + 'px',
      borderRadius: button.borderRadius,
      color: button.textColor ? button.textColor : colors.color_1,
      background: button.backgroundColor ? button.backgroundColor : colors.color_8,
      borderColor: button.borderColor ? button.borderColor : colors.color_8
    };
    url = button.url;
    const errorMessage = !url && t && !buttonObj && (
      <ErrorIcon width="18px" height="18px" className={styles.errorOverlay} />
    );
    style = {
      ...style,
      color: (!url && t && !buttonObj) ? '#5D9AFF' : '#FFFFFF'
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
      buttonText = buttonObj.data.buttonText || this.buttonName;
    }

    return (
      <ButtonViewer
        url={url}
        style={style}
        target={target}
        rel={rel}
        buttonText={buttonText}
        t={t}
        theme={theme}
        errorMessage={errorMessage}
      />
    );
  }
}

ButtonComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object,
  style: PropTypes.object,
  buttonObj: PropTypes.object,
  anchorTarget: PropTypes.string.isRequired,
  relValue: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  t: PropTypes.func
};

export default ButtonComponent;
