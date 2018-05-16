import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  getTextAlignment,
  AlignmentLeftIcon,
  AlignmentCenterIcon,
  AlignmentRightIcon,
  AlignmentJustifyIcon,
} from 'wix-rich-content-common';
import TextButton from './TextButton';
import TextAlignmentPanel from './TextAlignmentPanel';

class TextAlignmentButton extends Component {

  handleClick = () => this.props.onOverrideContent(TextAlignmentPanel);

  getActiveIcon = () => {
    const { getEditorState } = this.props;
    // if the button is rendered before the editor
    if (!getEditorState) {
      return false;
    }

    const textAlignment = getTextAlignment(getEditorState());
    switch (textAlignment) {
      case 'center':
        return <AlignmentCenterIcon />;
      case 'right':
        return <AlignmentRightIcon />;
      case 'justify':
        return <AlignmentJustifyIcon />;
      case 'left':
      default:
        return <AlignmentLeftIcon />;
    }
  };

  render() {
    const { theme, isMobile, t, tabIndex } = this.props;
    const alignmentButtonTooltip = t('TextAlignmentButton_Tooltip');
    const textForHooks = alignmentButtonTooltip.replace(/\s+/, '');
    const dataHookText = `textAlignmentButton_${textForHooks}`;

    return (
      <TextButton
        icon={this.getActiveIcon}
        theme={theme}
        isMobile={isMobile}
        dataHook={dataHookText} onClick={this.handleClick}
        tooltipText={alignmentButtonTooltip}
        tabIndex={tabIndex}
      />
    );
  }
}

TextAlignmentButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
};

export default TextAlignmentButton;
