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
    desktop: Array<Component> | any,
    mobile: {
      ios: Array<Component> | any,
      android: Array<Component> | any
    }
  }
};

declare type GetToolbarSettings = ({ textButtons: Array<any>, pluginButtons: Array<any> }) => Array<ToolbarSettings>;
