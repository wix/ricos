/*::
declare type InlineButton = {
  type: BUTTONS,
  keyName: string,
  icon?: Component,
  mobile?: boolean,
  mapComponentDataToButtonProps?: Function,
  tooltipTextKey?: string,
  multiple?: boolean,
  onFilesSelected?: (pubsub: Pubsub, files: Array<any>) => void,
  panelContent?: Function,
  min?: number,
  max?: number,
  inputMax?: number,
  modalName?: string,
  modalStyles?: any,
  t?: Translate,
  anchorTarget?: string,
  relValue?: string,
  disabled?: boolean,
  desktop?: boolean,
};

declare type CreateInlineButtons = ({
 t: Translate,
 styles: any,
 anchorTarget: string,
 relValue: string,
 isMobile: boolean,
 uiSettings: any,
 settings: any,
 closeInlinePluginToolbar: () => void,
}) => Array<InlineButton>;
*/
