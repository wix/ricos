/* eslint-disable no-undef */

// Viewer mapping
declare type ElementType = "inline" | "block";

declare type PluginMapping = {
  component: Function,
  classNameStrategies?: {
    size?: Function,
    alignment?: Function,
    textWrap?: Function,
    container?: Function
  },
  elementType?: ElementType
};

declare type PluginTypeMapper = () => { [type: string]: PluginMapping };

// TextButton mapping
declare type MODIFIER_KEYS = 'command' | 'shift' | 'ctrl' | 'option';

declare type CommandHandler = (editorState : any) => any;

declare type KeyBinding = {
  keyCommand: {
    command: string,
    modifiers: ?Array<MODIFIER_KEYS>,
    key: string
  },
  commandHandler: CommandHandler
};

declare type TextButtonMapping = {
    component: Function,
    isMobile?: boolean,
    position?: {
      mobile?: number,
      desktop?: number
     },
    keyBindings?: Array<KeyBinding>
};

declare type TextButtonMappingParams = {
  helpers: {
    openModal?: (props: any) => void,
    closeModal?: Function
  },
  isMobile: boolean,
  anchorTarget: string,
  relValue: string,
  t: Function,
  theme: any,
  getEditorState: () => any,
  setEditorState: (editorState: any) => void
 };

/* eslint-enable no-undef */
