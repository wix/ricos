import { pickBy } from 'lodash';
import { RichContentTheme } from 'wix-rich-content-common';

export const getToolbarTheme = (theme: RichContentTheme, type: string) => ({
  toolbarStyles: pickBy(theme, (_value, key) => key.startsWith(`${type}Toolbar`)),
  buttonStyles: pickBy(theme, (_value, key) => key.startsWith(`${type}ToolbarButton`)),
  separatorStyles: pickBy(theme, (_value, key) => key.startsWith(`${type}ToolbarSeparator`)),
  wrapperStyles: pickBy(theme, (_value, key) => key.startsWith(`${type}ToolbarWrapper`)),
});
