import { Separator, decorateComponentWithProps } from 'wix-rich-content-common';

export default ({ theme = {}, horizontal = false }) => {
  const separatorProps = { name: 'Separator', horizontal };
  const { separatorStyles } = theme;
  if (separatorStyles && separatorStyles.inlineToolbarSeparator) {
    separatorProps.className = separatorStyles.inlineToolbarSeparator;
  }
  if (separatorStyles && separatorStyles.separator) {
    separatorProps.className = separatorStyles.separator;
  }
  return decorateComponentWithProps(Separator, separatorProps);
};
