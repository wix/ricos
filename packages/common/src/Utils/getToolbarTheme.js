import pickBy from 'lodash/pickBy';

export const getToolbarTheme = (theme, type) => ({
  toolbarStyles: pickBy(theme, (value, key) =>
    key.startsWith(`${type}Toolbar`)
  ),
  buttonStyles: pickBy(theme, (value, key) =>
    key.startsWith(`${type}ToolbarButton`)
  ),
  separatorStyles: pickBy(theme, (value, key) =>
    key.startsWith(`${type}ToolbarSeparator`)
  ),
  wrapperStyles: pickBy(theme, (value, key) =>
    key.startsWith(`${type}ToolbarWrapper`)
  )
});
