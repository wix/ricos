import React from 'react';
import PropTypes from 'prop-types';
import { InlineToolbarButton, indentSelectedBlocks } from 'wix-rich-content-editor-common';
import { isRtl } from 'wix-rich-content-common';
import rightIndentPluginIcon from '../icons/rightIndentPluginIcon.svg';
import leftIndentPluginIcon from '../icons/leftIndentPluginIcon.svg';

function indentButton(props) {
  const {
    theme,
    isMobile,
    t,
    locale,
    tabIndex,
    setEditorState,
    getEditorState,
    adjustment,
    tooltipKey,
    dataHook,
  } = props;

  let icon;
  if (adjustment === 1) {
    icon = !isRtl(locale) ? leftIndentPluginIcon : rightIndentPluginIcon;
  } else {
    icon = !isRtl(locale) ? rightIndentPluginIcon : leftIndentPluginIcon;
  }

  return (
    <InlineToolbarButton
      onClick={() => {
        const editorState = getEditorState();
        const newState = indentSelectedBlocks(editorState, adjustment);
        if (newState !== editorState) {
          setEditorState(newState);
        }
      }}
      theme={theme}
      isMobile={isMobile}
      tooltipText={t(tooltipKey)}
      dataHook={dataHook}
      tabIndex={tabIndex}
      icon={icon}
    />
  );
}

export function decreaseIndentButton(props) {
  return indentButton({
    ...props,
    adjustment: -1,
    tooltipKey: 'decreaseIndentButton_Tooltip',
    dataHook: 'decreaseIndentButton',
  });
}

export function increaseIndentButton(props) {
  return indentButton({
    ...props,
    adjustment: 1,
    tooltipKey: 'increaseIndentButton_Tooltip',
    dataHook: 'increaseIndentButton',
  });
}

indentButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  locale: PropTypes.string,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
  config: PropTypes.object,
  adjustment: PropTypes.number,
  tooltipKey: PropTypes.string,
  dataHook: PropTypes.string,
};
