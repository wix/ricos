import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Context, normalizeUrl } from 'wix-rich-content-common';
import { alignmentClassName, sizeClassName } from '../classNameStrategies.js';
import { COLORS } from '../constants';
import ButtonViewer from './button-viewer';

class ButtonComponent extends PureComponent {
  static alignmentClassName = (componentData, theme, styles, isMobile) =>
    alignmentClassName(componentData, theme, styles, isMobile);

  static sizeClassName = (componentData, theme, styles, isMobile) =>
    sizeClassName(componentData, theme, styles, isMobile);

  render() {
    const colors = get(this.props, 'settings.colors', COLORS);
    const {
      componentData: { button },
    } = this.props;
    const { anchorTarget = '_self', relValue = '', theme } = this.context || this.props;
    const buttonText = button.buttonText;
    const target =
      typeof button.target === 'undefined' ? anchorTarget : button.target ? '_blank' : '_self';
    const rel = typeof button.rel === 'undefined' ? relValue : button.rel ? 'nofollow' : '';
    const style = {
      border: '0px solid blue',
      ...this.props.style,
      borderWidth: button.borderWidth + 'px',
      padding: button.padding + 'px',
      borderRadius: button.borderRadius,
      color: button.textColor ? button.textColor : colors.color1,
      background: button.backgroundColor ? button.backgroundColor : colors.color8,
      borderColor: button.borderColor ? button.borderColor : colors.color8,
    };
    const url = button.url;
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
