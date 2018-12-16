import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ButtonViewer from './button-viewer';

class ButtonComponent extends PureComponent {

  constructor(props) {
    super(props);
    const { componentData: { button } } = this.props;
    this.state = {
      style: button,
    };
  }

  render() {
    const { colors } = this.props.settings;
    const { componentData: { button }, buttonObj, anchorTarget, relValue } = this.props;
    let buttonText = button.buttonText;
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
    }

    return (
      <ButtonViewer
        url={url}
        style={style}
        target={target}
        rel={rel}
        buttonText={buttonText}
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
};

export default ButtonComponent;
