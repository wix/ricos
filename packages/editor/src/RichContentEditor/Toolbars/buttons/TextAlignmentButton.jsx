import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getTextAlignment } from 'wix-rich-content-common';
import TextButton from './TextButton';
import TextAlignmentPanel from './TextAlignmentPanel';
import AlignTextLeftIcon from '../icons/align-text-left.svg';
import AlignTextCenterIcon from '../icons/align-text-center.svg';
import AlignTextRightIcon from '../icons/align-text-right.svg';
import AlignTextJustifyIcon from '../icons/align-text-justify.svg';

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
        return <AlignTextCenterIcon />;
      case 'right':
        return <AlignTextRightIcon />;
      case 'justify':
        return <AlignTextJustifyIcon />;
      case 'left':
      default:
        return <AlignTextLeftIcon />;
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
