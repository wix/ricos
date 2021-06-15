import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from 'wix-rich-content-editor-common';
import TextButton from '../TextButton';
import { withToolbarBI } from 'wix-rich-content-common';

export default ({ style, Icon, tooltipTextKey }) => {
  const checkIsActive = editorState => editorState?.getCurrentInlineStyle().has(style);
  class TextInlineStyleButton extends Component {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      theme: PropTypes.object.isRequired,
      helpers: PropTypes.object,
      isMobile: PropTypes.bool,
      t: PropTypes.func,
      tabIndex: PropTypes.number,
      onClick: PropTypes.func,
    };

    toggleStyle = event => {
      const { getEditorState, setEditorState, onClick } = this.props;
      event.preventDefault();
      onClick?.();
      setEditorState(RichUtils.toggleInlineStyle(getEditorState(), style));
    };

    render() {
      const { theme, isMobile, t, tabIndex, getEditorState } = this.props;
      const tooltipText = t(tooltipTextKey);
      const textForHooks = tooltipText.replace(/\s+/, '');
      const dataHookText = `textInlineStyleButton_${textForHooks}`;
      const isActive = () => checkIsActive(getEditorState());

      return (
        <TextButton
          icon={Icon}
          theme={theme}
          isMobile={isMobile}
          isActive={isActive}
          onClick={this.toggleStyle}
          tooltipText={tooltipText}
          dataHook={dataHookText}
          tabIndex={tabIndex}
          tooltipOffset={{ y: -20 }}
        />
      );
    }
  }

  return withToolbarBI(({ t, getEditorState }) => ({
    type: 'FORMATTING',
    buttonName: t(tooltipTextKey).replace(/\s+/, ''),
    value: String(!checkIsActive(getEditorState?.())),
  }))(TextInlineStyleButton);
};
