/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { FunctionComponent, MouseEventHandler, ReactElement, useState } from 'react';
import { Page, RichContentEditorBox } from '../Components/StoryParts';
import { TOOLBARS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';
import FormattingGroupButton from 'wix-rich-content-editor-common/libs/FormattingGroupButton';
import FormattingDropdownButton from 'wix-rich-content-editor-common/libs/FormattingDropdownButton';
import EditorWrapper from '../Components/EditorWrapper';
import s from './FormattingExternalToolbar.scss';

let editorRef;

const getButtonStyles = ({ disabled, active }) => ({
  background: disabled ? 'lightgrey' : active ? 'cyan' : 'white',
  ...(disabled && { fill: '#bbb' }),
});

const mappings = {
  [BUTTON_TYPES.SEPARATOR]: () => (
    <img
      className={s.divider}
      alt="lemming"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTrDBJoeCHoZXvvwJDvkMxBArCVCXpmxj9Xhw&usqp=CAU"
    />
  ),
  [BUTTON_TYPES.DROPDOWN]: ({
    disableState,
    isDisabled,
    ...rest
  }: {
    disableState?: boolean;
    isDisabled?: () => boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }) => <FormattingDropdownButton {...rest} isDisabled={() => disableState || isDisabled()} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [BUTTON_TYPES.GROUP]: ({ buttonList, ...rest }: { buttonList?: any[]; [key: string]: any }) => {
    return (
      <FormattingGroupButton
        buttons={Object.values(buttonList)}
        getButtonStyles={getButtonStyles}
        {...rest}
      />
    );
  },
};

const ExternalFormattingButton: FunctionComponent<{
  name?: string;
  tooltip?: string;
  getIcon?: () => ReactElement;
  onClick?: MouseEventHandler;
  isDisabled?: () => boolean;
  isActive?: () => boolean;
  disableState?: boolean;
  arrow?: boolean;
  type?: string;
}> = buttonProps => {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon: any = arrow || !getIcon ? () => <span>{name}</span> : getIcon();

  const disabled = disableState || isDisabled();
  return (
    <Tooltip content={tooltip} key={name}>
      <button
        onClick={onClick}
        disabled={disabled}
        style={getButtonStyles({ disabled, active: isActive() })}
      >
        <Icon />
      </button>
    </Tooltip>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ExternalFormattingToolbar: FunctionComponent<{ toolbarProps?: any; disabled?: boolean }> = ({
  toolbarProps,
  disabled,
}) => {
  if (!toolbarProps) {
    return null;
  }
  const { buttons } = toolbarProps;

  return (
    <div className={s.root}>
      My beatuiful External Toolbar!
      {Object.values(buttons).map(({ name, ...rest }) => {
        return (
          <ExternalFormattingButton key={name} disableState={disabled} name={name} {...rest} />
        );
      })}
    </div>
  );
};

export default () => {
  const [currentContent, setCurrentContent] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const toolbarProps = editorRef && editorRef.getToolbarProps(TOOLBARS.FORMATTING);

  return (
    <Page title="External Formatting Example">
      <ExternalFormattingToolbar toolbarProps={toolbarProps} disabled={disabled} />
      <input
        type="text"
        placeholder="Header which is not related to RCE"
        onFocus={() => setDisabled(true)}
        style={{ border: 'none', fontSize: '40px', width: '100%' }}
      />
      <RichContentEditorBox preset="blog-preset">
        <EditorWrapper
          onChange={setCurrentContent}
          content={currentContent}
          ref={ref => (editorRef = ref)}
          onFocus={() => setDisabled(false)}
          toolbarSettings={{
            getToolbarSettings: () => {
              return [
                { name: TOOLBARS.FORMATTING, shouldCreate: () => ({ desktop: true }) },
                { name: TOOLBARS.INLINE, shouldCreate: () => ({ desktop: false }) },
              ];
            },
          }}
        />
      </RichContentEditorBox>
    </Page>
  );
};
