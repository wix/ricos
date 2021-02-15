import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { normalizeUrl } from 'wix-rich-content-common';
import { alignmentClassName, sizeClassName } from '../classNameStrategies';
import ButtonViewer from './button-viewer';

class ButtonComponent extends PureComponent {
  static alignmentClassName = (componentData, theme, styles, isMobile) =>
    alignmentClassName(componentData, theme, styles, isMobile);

  static sizeClassName = (componentData, theme, styles, isMobile) =>
    sizeClassName(componentData, theme, styles, isMobile);

  render() {
    const {
      componentData: { button },
      settings: { onClick },
    } = this.props;
    const { theme } = this.props;
    const buttonText = button.settings.buttonText;
    const target = button.settings.target ? '_blank' : '_self';
    const rel = button.settings.rel ? 'nofollow' : '';
    const style = {
      border: '0px solid blue',
      ...this.props.style,
      ...button.design,
    };
    const url = button.settings.url;
    return (
      <ButtonViewer
        url={normalizeUrl(url)}
        style={style}
        target={target}
        rel={rel}
        buttonText={buttonText}
        theme={theme}
        onClick={onClick}
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
  theme: PropTypes.object.isRequired,
};

export default ButtonComponent;
