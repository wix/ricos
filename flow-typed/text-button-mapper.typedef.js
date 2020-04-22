/*::
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
    component: Component,
    isMobile?: boolean,
    position?: {
      mobile?: number,
      desktop?: number
     },
    keyBindings?: Array<KeyBinding>
};

declare type TextButtonMappingParams = {
  helpers: Helpers,
  isMobile: boolean,
  anchorTarget: string,
  relValue: string,
  t: Translate,
  theme: any,
  getEditorState: () => any,
  setEditorState: (editorState: any) => void,
  settings: any,
  uiSettings: any,
  closeInlinePluginToolbar: () => void
 };

 declare type TextButtonMapper = (params: TextButtonMappingParams) => {
  TextButtonMapper: () => { [type: string]: TextButtonMapping }
};
*/
