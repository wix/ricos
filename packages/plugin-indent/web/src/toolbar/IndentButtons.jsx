import React from 'react';
import PropTypes from 'prop-types';
import { indentSelectedBlocks } from 'wix-rich-content-editor-common';
import { InlineToolbarButton } from 'wix-rich-content-ui-components';
import decreaseIndentPluginIcon from '../icons/decreaseIndentPluginIcon';
import increaseIndentPluginIcon from '../icons/increaseIndentPluginIcon';
import { INDENT_TYPE } from '../types';

function indentButton(props) {
  const {
    theme,
    helpers,
    isMobile,
    t,
    tabIndex,
    setEditorState,
    getEditorState,
    adjustment,
    tooltipKey,
    dataHook,
    icon,
  } = props;
  return (
    <InlineToolbarButton
      onClick={() => {
        const editorState = getEditorState();
        const newState = indentSelectedBlocks(editorState, adjustment);
        if (newState !== editorState) {
          setEditorState(newState);
        }
      }}
      helpers={helpers}
      theme={theme}
      isMobile={isMobile}
      tooltipText={t(tooltipKey)}
      dataHook={dataHook}
      tabIndex={tabIndex}
      icon={icon}
      pluginType={INDENT_TYPE}
    />
  );
}

export function DecreaseIndentButton(props) {
  return indentButton({
    ...props,
    adjustment: -1,
    tooltipKey: 'decreaseIndentButton_Tooltip',
    dataHook: 'decreaseIndentButton',
    icon: decreaseIndentPluginIcon,
  });
}

export function IncreaseIndentButton(props) {
  return indentButton({
    ...props,
    adjustment: 1,
    tooltipKey: 'increaseIndentButton_Tooltip',
    dataHook: 'increaseIndentButton',
    icon: increaseIndentPluginIcon,
  });
}

indentButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
  config: PropTypes.object,
  adjustment: PropTypes.number,
  tooltipKey: PropTypes.string,
  dataHook: PropTypes.string,
  icon: PropTypes.object,
};
