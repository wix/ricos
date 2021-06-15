import { Helpers, ToolbarType, onToolbarButtonClickArgs } from 'wix-rich-content-common';

export const withToolbarType = (helpers: Helpers, type: ToolbarType) => ({
  ...helpers,
  onToolbarButtonClick: (args: onToolbarButtonClickArgs) =>
    helpers?.onToolbarButtonClick?.({ ...args, type }),
});
