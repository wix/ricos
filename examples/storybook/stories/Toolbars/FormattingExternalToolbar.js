/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Page } from '../Components/StoryParts';
import {
  Tooltip,
  TooltipHost,
  BUTTON_TYPES,
  TextDropdownButton,
} from 'wix-rich-content-editor-common';

import EditorWrapper from '../Components/EditorWrapper';

let editorRef;
const mappings = {
  // [BUTTON_TYPES.FILE]: this.renderFileUploadButton,
  // [BUTTON_TYPES.BUTTON]: this.renderButton,
  // [BUTTON_TYPES.SEPARATOR]: this.renderSeparator,
  // [BUTTON_TYPES.DROPDOWN]: this.renderDropDown,
  [BUTTON_TYPES.GROUP]: ({ buttonList, tooltip, dataHook }) => {
    const dropDownProps = {
      buttons: Object.values(buttonList),
      tooltip,
      dataHook,
      styles: { marginLeft: '20px' },
    };
    return <TextDropdownButton {...dropDownProps} />;
  },
};

const ExternalFormattingButon = buttonProps => {
  const {
    type,
    name,
    getIcon,
    tooltip,
    onClick,
    disableState,
    arrow = false,
    isActive = () => false,
    isDisabled = () => false,
  } = buttonProps;

  const Button = mappings[type];
  if (Button) {
    return <Button {...buttonProps} />;
  }
  const Icon = arrow ? () => <span>{name}</span> : getIcon ? getIcon() : () => <span>{name}</span>;

  const disabled = disableState || isDisabled();
  return (
    <Tooltip content={tooltip} key={name}>
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          marginLeft: '20px',
          background: disabled ? 'lightgrey' : isActive() ? 'cyan' : 'white',
          ...(disabled && { fill: '#bbb' }),
        }}
      >
        <Icon />
      </button>
    </Tooltip>
  );
};

ExternalFormattingButon.propTypes = {
  name: PropTypes.string,
  tooltip: PropTypes.string,
  getIcon: PropTypes.func,
  onClick: PropTypes.func,
  isDisabled: PropTypes.func,
  isActive: PropTypes.func,
  disableState: PropTypes.bool,
  arrow: PropTypes.bool,
};

const ExternalFormattingToolbar = ({ toolbarProps, disabled }) => {
  if (!toolbarProps) {
    return null;
  }
  const { buttons } = toolbarProps;

  const formattingButtons = Object.values(buttons).filter(x => x.toolbar === 'formatting');

  return (
    <div style={{ border: '1px solid black', padding: '20px' }}>
      My beatuiful External Toolbar!
      {formattingButtons
        .filter(({ type }) => type !== BUTTON_TYPES.SEPARATOR)
        .map(button => {
          return <ExternalFormattingButon key={button.name} disableState={disabled} {...button} />;
        })}
      <TooltipHost />
    </div>
  );
};

ExternalFormattingToolbar.propTypes = {
  toolbarProps: PropTypes.object,
  disabled: PropTypes.boolean,
};

export default () => {
  const [currentContent, setCurrentContent] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const toolbarProps = editorRef && editorRef.getToolbarProps();

  return (
    <Page title="External Formatting Example">
      <ExternalFormattingToolbar toolbarProps={toolbarProps} disabled={disabled} />
      <input
        type="text"
        placeholder="Header which is not related to RCE"
        onFocus={() => setDisabled(true)}
        style={{ border: 'none', fontSize: '40px', width: '100%' }}
      />
      <EditorWrapper
        onChange={setCurrentContent}
        content={currentContent}
        ref={ref => (editorRef = ref)}
        onFocus={() => setDisabled(false)}
        config={{
          getToolbarSettings: () => {
            return [
              { name: 'EXTERNAL', shouldCreate: () => ({ desktop: true }) },
              { name: 'INLINE', shouldCreate: () => ({ desktop: false }) },
            ];
          },
        }}
      />
    </Page>
  );
};
