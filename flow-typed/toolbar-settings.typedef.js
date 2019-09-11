/*::
declare type ToolbarSettings = {
  name: TOOLBARS,
  shouldCreate: () => {
    desktop: boolean,
    mobile: {
      ios: boolean,
      android: boolean
    }
  },
  getVisibilityFn: () => {
    desktop: (editorState: any) => boolean,
    mobile: {
      ios: (editorState: any) => boolean,
      android: (editorState: any) => boolean
    }
  },
  getPositionOffset: () => {
    desktop: { x: number, y: number },
    mobile: {
      ios: { x: number, y: number },
      android: { x: number, y: number }
    }
  },
  getButtons: () => {
    desktop: Array<any>,
    mobile: {
      ios: Array<any>,
      android: Array<any>
    }
  },
  getTextPluginButtons: () => {
    desktop: { [key:string]: Component },
    mobile: {
      ios: { [key:string]: Component },
      android: { [key:string]: Component }
    }
  }
};

declare type TextButtons = {
  desktop: Array<string>,
  mobile: Array<string>
};

declare type PluginTextButtons = {
	desktop: { [key:string]: Component },
	mobile: { [key:string]: Component }
};

declare type GetToolbarSettings =
  ({ textButtons: TextButtons, pluginButtons: Array<any>, pluginTextButtons: PluginTextButtons }) => Array<ToolbarSettings>;
*/
