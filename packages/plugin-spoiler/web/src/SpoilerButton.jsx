import React from 'react';
import PropTypes from 'prop-types';
import { InlineToolbarButton } from 'wix-rich-content-editor-common';
// import decreaseIndentPluginIcon from '../icons/decreaseIndentPluginIcon.svg';
// import increaseIndentPluginIcon from '../icons/increaseIndentPluginIcon.svg';
// import { DEFAULTS } from '../spoiler-component';
// import { TOOLBARS } from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';

function createSpoilerButton(props) {
  const {
    theme,
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
        // const newState = spoilerToSelectedBlocks(editorState, adjustment);
        const newState = {};
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

export function SpoilerButton(props) {
  return createSpoilerButton({
    ...props,
    // adjustment: -1,
    tooltipKey: 'spoilerButton_Tooltip',
    dataHook: 'spoilerButton',
    icon: InsertPluginIcon,
  });
}

createSpoilerButton.propTypes = {
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
