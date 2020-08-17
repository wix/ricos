import { Separator, decorateComponentWithProps } from 'wix-rich-content-editor-common';

export default ({ theme = {} }) => {
  const separatorProps = { name: 'Separator', horizontal: false };
  const { separatorStyles } = theme;
  if (separatorStyles && separatorStyles.inlineToolbarSeparator) {
    separatorProps.className = separatorStyles.inlineToolbarSeparator;
  }
  if (separatorStyles && separatorStyles.separator) {
    separatorProps.className = separatorStyles.separator;
  }
  return decorateComponentWithProps(Separator, separatorProps);
};
