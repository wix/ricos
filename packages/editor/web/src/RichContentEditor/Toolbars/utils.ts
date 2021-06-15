import { Helpers, ToolbarType } from 'wix-rich-content-common';
export const withToolbarType = (helpers: Helpers, type: ToolbarType) => ({
  ...helpers,
  onToolbarButtonClick: args => helpers?.onToolbarButtonClick?.({ ...args, type }),
});
