import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Context, normalizeUrl } from 'wix-rich-content-common';
import { COLORS } from '../constants';
import ButtonViewer from './button-viewer';

class ButtonComponent extends PureComponent {
  constructor(props) {
    super(props);
    const {
      componentData: { button },
    } = this.props;
    this.state = {
      style: button,
    };
  }

  render() {
    const colors = get(this.props, 'settings.colors', COLORS);
    const {
      componentData: { button },
      buttonObj,
      blockProps,
    } = this.props;
    const { anchorTarget = '_self', relValue = '', theme } = this.context || this.props;
    let buttonText = button.buttonText;
    let rel = '';
    let url = '';
    let style = {
      border: '0px solid blue',
      ...this.props.style,
    };

    const target =
      typeof button.target === 'undefined' ? anchorTarget : button.target ? '_blank' : '_self';
    rel = typeof button.rel === 'undefined' ? relValue : button.rel ? 'nofollow' : '';
    style = {
      ...style,
      borderWidth: button.borderWidth + 'px',
      padding: button.padding + 'px',
      borderRadius: button.borderRadius,
      color: button.textColor ? button.textColor : colors.color1,
      background: button.backgroundColor ? button.backgroundColor : colors.color8,
      borderColor: button.borderColor ? button.borderColor : colors.color8,
    };
    url = button.url;
    const textColor = blockProps &&
      !blockProps.isFocused &&
      !url && {
        color: '#5D9AFF',
      };
    style = {
      ...style,
      ...textColor,
    };
    if (buttonObj) {
      style = {
        ...style,
        borderWidth: buttonObj.design.borderWidth + 'px',
        padding: buttonObj.design.padding + 'px',
        borderRadius: buttonObj.design.borderRadius,
        color: buttonObj.design.textColor,
        background: buttonObj.design.backgroundColor,
        borderColor: buttonObj.design.borderColor,
      };
      buttonText = buttonObj.data.buttonText;
    }

    return (
      <ButtonViewer
        url={normalizeUrl(url)}
        style={style}
        target={target}
        rel={rel}
        buttonText={buttonText}
        theme={theme}
      />
    );
  }
}

ButtonComponent.propTypes = {
  componentData: PropTypes.object,
  style: PropTypes.object,
  buttonObj: PropTypes.object,
  settings: PropTypes.object.isRequired,
  blockProps: PropTypes.object,
};

ButtonComponent.contextType = Context.type;

export default ButtonComponent;
